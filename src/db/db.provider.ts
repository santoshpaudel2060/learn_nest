import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export const DATABASE = 'DATABASE';

export const databaseProvider = {
  provide: DATABASE,
  useFactory: () => {
    const sql = neon(process.env.DATABASE_URL!);

    return drizzle(sql);
  },
};
