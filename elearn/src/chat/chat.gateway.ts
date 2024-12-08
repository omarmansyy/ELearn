import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
@Injectable()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;  //instance

 
  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Method to send messages to all connected clients
  sendMessage(client: Socket, message: string) {
    this.server.emit('message', message);  // Broadcast message to all clients
  }

  // You can extend this method for sending messages to specific users or groups
}
