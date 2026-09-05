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
import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findById(id);
  }

  @Post()
  create(@Body() data: CreatePostDto) {
    return this.postsService.create(data);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePostDto) {
    return this.postsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
