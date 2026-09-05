import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'A useful post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Post content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  authorId: number;
}
