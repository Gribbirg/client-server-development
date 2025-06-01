import { Pool } from 'pg';

const pool = new Pool({
  user: 'alexgribkov',
  host: 'localhost',
  database: 'crudapp',
  password: '',
  port: 5432,
});

export default pool; 