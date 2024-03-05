import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
// import { ERole } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

  async handleConnection(socket: Socket) {
    const data = socket.handshake.query.user;
    console.log({ data });
    if (data) {
      socket.data.user = data;
      console.log('CONNECTION SUCCESS');
    } else this.handleDisconnect();
  }
  handleDisconnect() {
    console.log('CONNECTION REMOVED');
  }

  @SubscribeMessage('joinChannel')
  joinChannel(socket: Socket, channel: string) {
    return this.chatService.JoinChannel(socket, channel);
  }

  @SubscribeMessage('leaveChannel')
  leaveChannel(socket: Socket, channel: string) {
    return this.chatService.leaveChannel(socket, channel);
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    socket: Socket,
    data: {
      channel: string;
      message: string;
      indentity: boolean;
      fullName: string;
      userId: string;
      userPhoto: string;
      receiverId: string;
    },
  ) {
    return this.chatService.sendMessage(this.server, data, socket.data.user);
  }
}
