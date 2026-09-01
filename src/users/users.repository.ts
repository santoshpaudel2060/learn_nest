import { Injectable, Inject } from '@nestjs/common';

import { eq } from 'drizzle-orm';
import { DATABASE } from '../db/db.provider.js';
import { users } from '../db/schema/users.schema.js';

@Injectable()
export class UserRepository {
  constructor(@Inject(DATABASE) private readonly db: any) {}

  findAll() {
    return this.db.select().from(users);
  }

  findById(id: number) {
    return this.db.select().from(users).where(eq(users.id, id));
  }

  create(data: { name: string; email: string; password: string }) {
    return this.db.insert(users).values(data).returning();
  }

  findByEmail(email: string) {
    return this.db.select().from(users).where(eq(users.email, email));
  }
  delete(id: number) {
    return this.db.delete(users).where(eq(users.id, id)).returning();
  }
}
