import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crudapp',
  password: 'postgres',
  port: 5432,
});

export default pool; 