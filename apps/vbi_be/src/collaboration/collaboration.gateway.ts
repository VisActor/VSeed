import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import type { Server, WebSocket } from 'ws';
import type { IncomingMessage } from 'http';
import { setupWSConnection, setPersistence } from 'y-websocket/bin/utils';
import { PrismaPersistenceService } from './prisma-persistence.service';

@WebSocketGateway({ path: '/collaboration/ws' })
export class CollaborationGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor(private persistenceService: PrismaPersistenceService) {}

  handleConnection(client: WebSocket, req: IncomingMessage) {
    const url = new URL(req.url ?? '', 'http://localhost');
    const room = url.searchParams.get('room');

    if (!room) {
      client.close();
      return;
    }

    console.log('New connection to room:', room);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setupWSConnection(client, req, { docName: room, gc: true });
  }

  handleDisconnect() {
    console.log('Client disconnected from room');
    // y-websocket handles its own disconnect logic via event listeners on the socket
  }

  afterInit() {
    console.log('YjsGateway initialized');
    // Initialize persistence
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setPersistence({
      bindState: this.persistenceService.bindState,
      writeState: this.persistenceService.writeState,
    });
  }
}
