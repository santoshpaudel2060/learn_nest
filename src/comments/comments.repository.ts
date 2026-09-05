import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE } from '../db/db.provider.js';
import { comments } from '../db/schema/comments.schema.js';

@Injectable()
export class CommentsRepository {
  constructor(@Inject(DATABASE) private readonly db: any) {}

  findAll() {
    return this.db.select().from(comments);
  }

  findById(id: number) {
    return this.db.select().from(comments).where(eq(comments.id, id)).limit(1);
  }

  findByPostId(postId: number) {
    return this.db.select().from(comments).where(eq(comments.postId, postId));
  }

  create(data: { content: string; postId: number; userId: number }) {
    return this.db.insert(comments).values(data).returning();
  }

  update(id: number, data: { content?: string }) {
    return this.db
      .update(comments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(comments.id, id))
      .returning();
  }

  delete(id: number) {
    return this.db.delete(comments).where(eq(comments.id, id)).returning();
  }
}
