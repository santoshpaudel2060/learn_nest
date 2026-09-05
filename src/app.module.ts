import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DbModule } from './db/db.module.js';
import { UsersModule } from './users/users.module.js';
import { PostsModule } from './posts/posts.module.js';
import { CommentsModule } from './comments/comments.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DbModule,

    UsersModule,

    PostsModule,

    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
