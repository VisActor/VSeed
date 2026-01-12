import { Server } from '@hocuspocus/server';
import { Logger } from '@hocuspocus/extension-logger';
import * as Y from 'yjs';
import { PrismaService } from '../app/prisma.service';
import { VBI } from '@visactor/vbi';

export class HocuspocusServer {
  private server: Server;

  constructor(private prisma: PrismaService) {
    this.server = new Server({
      port: 1234,
      address: '0.0.0.0',
      yDocOptions: { gc: false, gcFilter: () => false }, // 关闭 GC 是为了做历史版本功能
      extensions: [new Logger()],
      timeout: 30000,
      debounce: 5000,
      maxDebounce: 30000,
      quiet: true,

      onAuthenticate: async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        // Add authentication logic here if needed
        // For example, validate JWT token from data.headers
        return { user: { id: 'anonymous' } };
      },
      onLoadDocument: async (data) => {
        // Load document from database
        const doc = await this.prisma.document.findUnique({
          where: { id: data.documentName },
        });

        const isEmptyDoc = !doc || (doc.data && doc.data.length === 0);
        if (isEmptyDoc) {
          // Create empty document with default structure
          const newDoc = new Y.Doc();
          const connectorId = 'demo';
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

          return newDoc;
        }

        const yDoc = new Y.Doc();

        // Load snapshot
        if (doc.data && doc.data.length > 0) {
          Y.applyUpdate(yDoc, doc.data);
        }

        // Load incremental updates
        const updates = await this.prisma.documentUpdate.findMany({
          where: { documentId: data.documentName },
          orderBy: { id: 'asc' },
        });

        if (updates.length > 0) {
          Y.transact(yDoc, () => {
            for (const update of updates) {
              Y.applyUpdate(yDoc, new Uint8Array(update.data));
            }
          });
        }

        return yDoc;
      },
      onStoreDocument: async (data) => {
        // Store document snapshot
        await this.prisma.document.upsert({
          where: { id: data.documentName },
          update: { data: Buffer.from(Y.encodeStateAsUpdate(data.document)) },
          create: {
            id: data.documentName,
            data: Buffer.from(Y.encodeStateAsUpdate(data.document)),
          },
        });

        // Clear incremental updates
        await this.prisma.documentUpdate.deleteMany({
          where: { documentId: data.documentName },
        });
      },
      onChange: async (data) => {
        // Store incremental updates
        await this.prisma.documentUpdate.create({
          data: {
            documentId: data.documentName,
            data: Buffer.from(data.update),
          },
        });
      },
    });
  }

  async start() {
    await this.server.listen(1234);
  }

  async stop() {
    await this.server.destroy();
  }
}
