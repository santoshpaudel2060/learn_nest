import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional({ example: 'Updated title' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated content' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
}
