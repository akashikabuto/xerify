import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
// import { ERole } from '@prisma/client';
import { GenericResponse } from 'src/__shared__/dto';
import { MessageService } from './message.service';

@Controller('message')
@ApiTags('message')
// @UseGuards(JwtGuard, RolesGuard)
// @ApiBearerAuth()
// @AllowRoles(ERole.CUSTOMER, ERole.COMPANY_USER)
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
// @ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'message list in a channel' })
  @ApiOkResponse({ description: 'messages  retrieved ' })
  @ApiQuery({ name: 'channelId', required: true, description: 'channel id' })
  @Get('message')
  async getMessage(@Query('channelId') channelId: string) {
    const result = await this.messageService.getMessages(channelId);
    return new GenericResponse('messages', result);
  }
}
