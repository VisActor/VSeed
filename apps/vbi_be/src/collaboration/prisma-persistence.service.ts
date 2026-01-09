import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import * as Y from 'yjs';
import { VBI } from '@visactor/vbi';
@Injectable()
export class PrismaPersistenceService {
  private logger = new Logger(PrismaPersistenceService.name);

  constructor(private prisma: PrismaService) {}
  bindState = async (docName: string, yDoc: Y.Doc) => {
    this.logger.log(`Binding state for document ${docName}`);
    try {
      // 1. Load snapshot
      const doc = await this.prisma.document.findUnique({
        where: { id: docName },
      });

      if (!doc) {
        this.logger.warn(`Document ${docName} not found in database`);
        // We could create it, or just let it be in-memory.
        // For now, let's assume it must exist to be persisted.
        return;
      }

      if (doc.data && doc.data.length > 0) {
        this.logger.log(`Loading snapshot for document ${docName}`);
        Y.applyUpdate(yDoc, new Uint8Array(doc.data));

        console.log('debug Y applyUpdate success', yDoc.get('dsl').toJSON());
      } else {
        this.logger.log(`Creating empty snapshot for document ${docName}`);
        const connectorId = 'demo';
        const newDoc = new Y.Doc();
        const empty = VBI.generateEmptyDSL(connectorId);
        const dsl = newDoc.getMap('dsl');
        newDoc.transact(() => {
          if (empty.connectorId) dsl.set('connectorId', empty.connectorId);
          if (empty.chartType) dsl.set('chartType', empty.chartType);
          if (empty.theme) dsl.set('theme', empty.theme);
          if (empty.locale) dsl.set('locale', empty.locale);
          if (empty.version) dsl.set('version', empty.version);

          if (!dsl.get('measures')) {
            dsl.set('measures', new Y.Array());
          }
          if (!dsl.get('dimensions')) {
            dsl.set('dimensions', new Y.Array());
          }
        });
        Y.applyUpdate(yDoc, Y.encodeStateAsUpdate(newDoc));
      }

      // 2. Load incremental updates
      const updates = await this.prisma.documentUpdate.findMany({
        where: { documentId: docName },
        orderBy: { id: 'asc' },
      });

      if (updates.length > 0) {
        Y.transact(yDoc, () => {
          for (const update of updates) {
            Y.applyUpdate(yDoc, new Uint8Array(update.data));
          }
        });
      }

      // 3. Listen for new updates
      yDoc.on('update', (update: Uint8Array) => {
        const run = async () => {
          await this.prisma.documentUpdate.create({
            data: {
              documentId: docName,
              data: Buffer.from(update),
            },
          });
        };

        run()
          .then(() => {
            this.logger.log(`Update stored for ${docName}`);
          })
          .catch((err) => {
            this.logger.error(`Failed to store update for ${docName}`, err);
          });
      });
    } catch (err) {
      this.logger.error(`Error binding state for ${docName}`, err);
    }
  };

  writeState = async (docName: string, yDoc: Y.Doc) => {
    this.logger.log(`Writing state (snapshot) for document ${docName}`);
    try {
      // Create a snapshot
      const state = Y.encodeStateAsUpdate(yDoc);

      // Update the main document with the snapshot
      await this.prisma.document.update({
        where: { id: docName },
        data: {
          data: Buffer.from(state),
        },
      });

      // Clear the incremental updates since we now have a full snapshot
      await this.prisma.documentUpdate.deleteMany({
        where: { documentId: docName },
      });

      this.logger.log(`Snapshot saved for ${docName}`);
    } catch (err) {
      // If document doesn't exist (e.g. deleted), this might fail.
      this.logger.error(`Failed to write state for ${docName}`, err);
    }
  };
}
