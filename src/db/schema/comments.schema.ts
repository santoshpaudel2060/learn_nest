import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users.schema.js';
import { posts } from './posts.schema.js';
import { relations } from 'drizzle-orm/relations';

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),

  content: text('content').notNull(),

  postId: integer('post_id')
    .notNull()
    .references(() => posts.id, {
      onDelete: 'cascade',
    }),

  userId: integer('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const commentRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));
