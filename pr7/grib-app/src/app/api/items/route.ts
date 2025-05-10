import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Создаем пул подключений PostgreSQL
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  database: process.env.POSTGRES_DB || 'gribapp',
  user: process.env.POSTGRES_USER || 'gribuser',
  password: process.env.POSTGRES_PASSWORD || 'gribpassword',
});

// GET /api/items - получение списка всех элементов
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

// POST /api/items - создание нового элемента
export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    
    // Проверка наличия обязательных полей
    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }
    
    // Вставка нового элемента и возврат созданного элемента
    const result = await pool.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
} 