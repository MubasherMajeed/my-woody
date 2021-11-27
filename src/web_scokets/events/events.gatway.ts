import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io"
import { Global } from "@nestjs/common";

@Global()
@WebSocketGateway()
export class EventsGatway implements OnGatewayInit {
  @WebSocketServer() server: Server;
  users: number = 0;

  afterInit(server: any): any {
    console.log("init method");
  }

  async handleConnection() {
    console.log("connection")
    // A client has connected
    this.users++;
    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    // A client has disconnected
    this.users--;
    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('chat')
  async onChat(client, message) {
    client.broadcast.emit('chat', message);
  }
}