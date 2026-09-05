import { Injectable, NotFoundException } from '@nestjs/common';

import { PostsRepository } from './posts.repository.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  findAll() {
    return this.postsRepository.findAll();
  }

  async findById(id: number) {
    const [post] = await this.postsRepository.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async create(data: CreatePostDto) {
    const [post] = await this.postsRepository.create(data);
    return post;
  }

  async update(id: number, data: UpdatePostDto) {
    await this.findById(id);
    const [post] = await this.postsRepository.update(id, data);
    return post;
  }

  async remove(id: number) {
    await this.findById(id);
    const [post] = await this.postsRepository.delete(id);
    return { message: 'Post deleted successfully', post };
  }
}
