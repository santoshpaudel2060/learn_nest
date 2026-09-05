import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiPropertyOptional({ example: 'Updated comment' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
}
