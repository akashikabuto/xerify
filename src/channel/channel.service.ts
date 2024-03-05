import { Injectable } from '@nestjs/common';
import { Channel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { createChannelDto } from './dto';

@Injectable()
export class ChannelService {
  constructor(private readonly prismaService: PrismaService) {}

  async createChannel(dto: createChannelDto): Promise<Channel> {
    const channel = await this.prismaService.channel.create({
      data: {
        id: uuidv4(),
        userId: dto.acc_id,
        user: dto.fullName,
        isGroup: false,
        receiverId: dto.receiver_id,
        receiverUser: dto.recFullName,
        senderUser: dto.sendFullName,
        userPhoto: dto.userPhoto,
        receivPhoto: dto.receivPhoto,
        companyImage: dto.companyImage,
        companyName: dto.companyName,
        role: dto.role,
      },
    });
    return channel;
  }

  async listChannels(
    userId: string,
    isGroup?: boolean,
    accountId?: string,
  ): Promise<Channel[]> {
    let channels: Channel[];

    if (isGroup && accountId) {
      channels = await this.prismaService.channel.findMany({
        where: {
          accountId,
          isGroup: true,
        },
      });
    } else {
      channels = await this.prismaService.channel.findMany({
        where: {
          OR: [{ userId }, { receiverId: userId }],
          AND: [{ isGroup: false }],
        },
      });
    }

    return channels;
  }

  async oneChannel(channelId: string): Promise<Channel> {
    const channel = await this.prismaService.channel.findFirst({
      where: {
        id: channelId,
      },
    });
    return channel;
  }

  async createGroupChannel(dto: createChannelDto): Promise<Channel> {
    const channel = await this.prismaService.channel.create({
      data: {
        id: uuidv4(),
        userId: dto.acc_id,
        user: dto.fullName,
        isGroup: true,
        receiverId: dto.receiver_id,
        receiverUser: dto.recFullName,
        senderUser: dto.sendFullName,
        userPhoto: dto.userPhoto,
        receivPhoto: dto.receivPhoto,
        workFlowId: dto.workFlowId,
        workFlowName: dto.workFlowName,
        topicId: dto.topicId,
        topicName: dto.topicName,
        accountId: dto.account_id,
        companyImage: dto.companyImage,
        companyName: dto.companyName,
        role: dto.role,
      },
    });
    return channel;
  }
}
