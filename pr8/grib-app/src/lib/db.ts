import { Pool } from 'pg';

// Конфигурация подключения к PostgreSQL
const pool = new Pool({
  user: 'alexgribkov',      // ваш системный пользователь
  host: 'localhost',
  database: 'crudapp',
  password: '',             // пустой пароль для macOS
  port: 5432,
});

export default pool; 