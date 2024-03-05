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
  @ApiProperty({ type: String, required: true })
  fullName: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, required: false })
  recFullName: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, required: false })
  sendFullName: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  userPhoto: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  receivPhoto: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  workFlowId: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  workFlowName: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  topicId: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  topicName: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  companyName?: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  companyImage?: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  role?: string;
}
