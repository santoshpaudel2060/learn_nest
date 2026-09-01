import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { posts } from './posts.schema.js';
import { comments } from './comments.schema.js';
import { relations } from 'drizzle-orm';
export const users = pgTable('users', {
  id: serial('id').primaryKey(),

  name: varchar('name', {
    length: 100,
  }).notNull(),

  email: varchar('email', {
    length: 255,
  })
    .notNull()
    .unique(),

  password: varchar('password', {
    length: 255,
  }).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}));
