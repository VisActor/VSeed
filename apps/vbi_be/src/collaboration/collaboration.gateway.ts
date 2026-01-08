import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import type { Server, WebSocket } from 'ws';
import type { IncomingMessage } from 'http';
import { setupWSConnection } from 'y-websocket/bin/utils';

@WebSocketGateway({ path: '/collaboration/ws' })
export class CollaborationGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

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
  }
}
