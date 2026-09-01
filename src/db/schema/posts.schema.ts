import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { users } from './users.schema.js';
import { relations } from 'drizzle-orm';
import { comments } from './comments.schema.js';

export const posts = pgTable('posts', {
  id: serial().primaryKey(),

  title: varchar('title', {
    length: 255,
  }).notNull(),

  content: text('content').notNull(),

  authorId: serial('author_id').references(() => users.id),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
}));
