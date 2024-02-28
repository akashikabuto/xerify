import { Injectable } from '@nestjs/common';
import { Conversation } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMessages(channelId: string): Promise<Conversation[]> {
    const messages = await this.prismaService.conversation.findMany({
      where: {
        channelId,
      },
    });
    return messages;
  }
}
