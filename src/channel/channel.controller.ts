import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GenericResponse } from 'src/__shared__/dto';
import { ChannelService } from './channel.service';
import { createChannelDto } from './dto';

@Controller('channel')
@ApiTags('channel')
@ApiInternalServerErrorResponse({ description: 'internal server error' })
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiOperation({ summary: 'create channel' })
  @ApiCreatedResponse({ description: 'new channel created' })
  @Post('channel')
  @ApiBody({ type: createChannelDto })
  async createChannel(@Body() dto: createChannelDto) {
    const result = await this.channelService.createChannel(dto);
    return new GenericResponse('channel', result);
  }

  @ApiOperation({ summary: 'list of channel' })
  @ApiOkResponse({ description: 'channels   retrieved ' })
  @ApiQuery({ name: 'userId', required: true, description: 'user id' })
  @ApiQuery({ name: 'isGroup', required: false, description: 'isGroup' })
  @ApiQuery({ name: 'accountId', required: false, description: 'accountId' })
  @Get('channel')
  async getChannels(
    @Query('userId') userId: string,
    @Query('isGroup') isGroup?: boolean,
    @Query('accountId') accountId?: string,
  ) {
    const result = await this.channelService.listChannels(
      userId,
      isGroup,
      accountId,
    );
    return new GenericResponse('channels', result);
  }

  @ApiOperation({ summary: 'one  channel info by id' })
  @ApiOkResponse({ description: 'channel info retrieved' })
  @Get('one-channel')
  @ApiQuery({ name: 'channelId', required: true, description: 'channel id' })
  async getOneChannel(@Query('channelId') channelId: string) {
    const result = await this.channelService.oneChannel(channelId);
    return new GenericResponse('one channel', result);
  }

  @ApiOperation({ summary: 'create a group channel' })
  @ApiCreatedResponse({ description: 'new group channel created' })
  @Post('group-channel')
  @ApiBody({ type: createChannelDto })
  async createGroupChannel(@Body() dto: createChannelDto) {
    const result = await this.channelService.createGroupChannel(dto);
    return new GenericResponse('group channel', result);
  }
}
