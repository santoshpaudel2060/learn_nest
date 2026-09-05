import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';
import { CommentsRepository } from './comments.repository.js';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  findAll() {
    return this.commentsRepository.findAll();
  }

  findByPostId(postId: number) {
    return this.commentsRepository.findByPostId(postId);
  }

  async findById(id: number) {
    const [comment] = await this.commentsRepository.findById(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async create(data: CreateCommentDto) {
    const [comment] = await this.commentsRepository.create(data);
    return comment;
  }

  async update(id: number, data: UpdateCommentDto) {
    await this.findById(id);
    const [comment] = await this.commentsRepository.update(id, data);
    return comment;
  }

  async remove(id: number) {
    await this.findById(id);
    const [comment] = await this.commentsRepository.delete(id);
    return { message: 'Comment deleted successfully', comment };
  }
}
