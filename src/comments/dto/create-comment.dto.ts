import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Great post!' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  postId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  userId: number;
}
