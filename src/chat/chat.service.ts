/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { createChannelDto } from 'src/channel/dto';
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
      receiverId: string;
      userPhoto: string;
      role: string;
      accId: string;
    },
    user: string,
  ) {
    const userData = JSON.parse(user);
    console.log({ userData }, { data });
    if (data.message) {
      server.to(data.channel).emit('Message', {
        id: uuidv4(),
        message: data.message,
        userId: userData.staff_id,
        channelId: data.channel,
        indentity: data.indentity,
        user: data.fullName,
        createdAt: new Date(),
        receiverId: data.receiverId,
        userPhoto: data.userPhoto,
        role: data.role,
        accId: data.accId,
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
          receiverId: data.receiverId,
          userPhoto: data.userPhoto,
          role: data.role,
          accId: data.accId,
        },
      });
    }
  }

  async createDirectChannel(
    socket: Socket,
    data: createChannelDto,
    server: Server,
  ) {
    if(data.id){
      setTimeout(()=>{
      server.to(data.id).emit('channelCreated', data);
      },1000)
      server.emit('channelUpdated', data.id)

    }
  }

  async createGroupChannel(
    socket: Socket,
    data: createChannelDto,
    server: Server,
  ) {
    //  const channel = await this.prisma.channel.create({
    //     data: {
    //       id: data.workFlowId,
    //       userId: data.acc_id,
    //       user: data.fullName,
    //       isGroup: true,
    //       receiverId: data.receiver_id,
    //       receiverUser: data.recFullName,
    //       senderUser: data.sendFullName,
    //       userPhoto: data.userPhoto,
    //       receivPhoto: data.receivPhoto,
    //       workFlowId: data.workFlowId,
    //       workFlowName: data.workFlowName,
    //       topicId: data.topicId,
    //       topicName: data.topicName,
    //       accountId: data.account_id,
    //       companyImage: data.companyImage,
    //       companyName: data.companyName,
    //       role: data.role,
    //     },
    //   });
    //   socket.join(channel.id)
    //   server.to(channel.id).emit('groupChannel',{
    //     id: data.workFlowId,
    //       userId: data.acc_id,
    //       user: data.fullName,
    //       isGroup: true,
    //       receiverId: data.receiver_id,
    //       receiverUser: data.recFullName,
    //       senderUser: data.sendFullName,
    //       userPhoto: data.userPhoto,
    //       receivPhoto: data.receivPhoto,
    //       workFlowId: data.workFlowId,
    //       workFlowName: data.workFlowName,
    //       topicId: data.topicId,
    //       topicName: data.topicName,
    //       accountId: data.account_id,
    //       companyImage: data.companyImage,
    //       companyName: data.companyName,
    //       role: data.role,
    //       channelId:channel.id
    //   })
  }
}
