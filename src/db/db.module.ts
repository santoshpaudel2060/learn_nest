import { Global, Module } from '@nestjs/common';
import { databaseProvider } from './db.provider.js';
import { DbController } from './db.controller.js';

@Global()
@Module({
  controllers: [DbController],
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DbModule {}
