import { Controller, Get, Inject } from '@nestjs/common';
import { DATABASE } from './db.provider.js';

@Controller('db')
export class DbController {
  constructor(
    @Inject(DATABASE)
    private readonly db: any,
  ) {}

  @Get('test')
  test() {
    return {
      message: 'Database provider is working!',
    };
  }
}
