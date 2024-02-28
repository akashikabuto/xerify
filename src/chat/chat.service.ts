import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  JoinChannel(socket: Socket, channel: string) {
    return socket.join(channel);
  }

  leaveChannel(socket: Socket, channel: string) {
    return socket.leave(channel);
  }

  async sendMessage(
    server: Server,
    data: {
      channel: string;
      message: string;
      indentity: boolean;
      fullName: string;
      userId: string;
    },
    user: string,
  ) {
    const userData = JSON.parse(user);

    if (data.message) {
      server.to(data.channel).emit('Message', {
        id: uuidv4(),
        message: data.message,
        userId: userData.staff_id,
        channelId: data.channel,
        indentity: data.indentity,
        user: data.fullName,
        createdAt: new Date(),
        // userPhoto: data.userPhoto,
      });
      await this.prisma.conversation.create({
        data: {
          id: uuidv4(),
          message: data.message,
          userId: userData.staff_id,
          channelId: data.channel,
          indentity: data.indentity,
          user: data.fullName,
          createdAt: new Date(),
          // userPhoto: data.userPhoto,
        },
      });
    }
  }
}
