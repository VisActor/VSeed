import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';

@Injectable()
export class PrismaPersistenceService {
  private logger = new Logger(PrismaPersistenceService.name);

  constructor(private prisma: PrismaService) {}

  bindState = async (docName: string, yDoc: any) => {
    const Y = await import('yjs');
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
        Y.applyUpdate(yDoc, new Uint8Array(doc.data));
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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

  writeState = async (docName: string, yDoc: any) => {
    const Y = await import('yjs');

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
      await this.prisma.documentUpdate.updateMany({
        where: { documentId: docName },
        data: {
          merged: true,
        },
      });

      this.logger.log(`Snapshot saved for ${docName}`);
    } catch (err) {
      // If document doesn't exist (e.g. deleted), this might fail.
      this.logger.error(`Failed to write state for ${docName}`, err);
    }
  };
}
