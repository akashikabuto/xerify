import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class createChannelDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, required: false })
  account_id?: string;
  @IsString()
  @ApiProperty({ type: String, required: true })
  acc_id: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, required: false })
  receiver_id: string;
  @IsString()
  @ApiProperty({ type: String, required: true, default: 'Akashi chris' })
  fullName: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, required: false, default: 'chris' })
  recFullName: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, required: false, default: 'chris' })
  sendFullName: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
    default: 'mmmmmmmmmmmm',
  })
  userPhoto: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
    default: 'vvvvvvvvvvv',
  })
  receivPhoto: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
    default: 'gh',
  })
  workFlowId: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
    default: 'b',
  })
  workFlowName: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
    default: 'rt',
  })
  topicId: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
    default: 'as',
  })
  topicName: string;
}
