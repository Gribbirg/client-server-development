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

// GET /api/items/[id] - получение элемента по ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // В Next.js 14 params должны быть обработаны асинхронно
  const paramsObj = await params;
  const id = parseInt(paramsObj.id, 10);
  
  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'Invalid ID format' },
      { status: 400 }
    );
  }
  
  try {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch item' },
      { status: 500 }
    );
  }
}

// PUT /api/items/[id] - обновление элемента по ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // В Next.js 14 params должны быть обработаны асинхронно
  const paramsObj = await params;
  const id = parseInt(paramsObj.id, 10);
  
  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'Invalid ID format' },
      { status: 400 }
    );
  }
  
  try {
    const { name, description } = await request.json();
    
    // Проверка наличия обязательных полей
    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }
    
    // Обновление элемента
    const result = await pool.query(
      'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    );
  }
}

// DELETE /api/items/[id] - удаление элемента по ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // В Next.js 14 params должны быть обработаны асинхронно
  const paramsObj = await params;
  const id = parseInt(paramsObj.id, 10);
  
  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'Invalid ID format' },
      { status: 400 }
    );
  }
  
  try {
    const result = await pool.query(
      'DELETE FROM items WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    );
  }
} 