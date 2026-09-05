import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE } from '../db/db.provider.js';
import { posts } from '../db/schema/posts.schema.js';

@Injectable()
export class PostsRepository {
  constructor(@Inject(DATABASE) private readonly db: any) {}

  async findAll() {
    return this.db.select().from(posts);
  }

  async findById(id: number) {
    return this.db.select().from(posts).where(eq(posts.id, id)).limit(1);
  }

  async create(data: { title: string; content: string; authorId: number }) {
    return this.db.insert(posts).values(data).returning();
  }

  async update(
    id: number,
    data: {
      title?: string;
      content?: string;
    },
  ) {
    return this.db.update(posts).set(data).where(eq(posts.id, id)).returning();
  }

  async delete(id: number) {
    return this.db.delete(posts).where(eq(posts.id, id)).returning();
  }
}
