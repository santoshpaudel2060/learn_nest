import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('post/:postId')
  findByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.findByPostId(postId);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findById(id);
  }

  @Post()
  create(@Body() data: CreateCommentDto) {
    return this.commentsService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.remove(id);
  }
}
