import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../lib/db';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const userId = request.headers.get('X-User-ID');
    const userRole = request.headers.get('X-User-Role');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: No user ID provided' }, { status: 401 });
    }
    
    let query;
    let queryParams: any[] = [id];
    
    if (userRole === 'admin') {
      query = `
        SELECT i.*, u.username 
        FROM items i
        JOIN users u ON i.user_id = u.id
        WHERE i.id = $1
      `;
    } 
    else {
      query = `
        SELECT i.* 
        FROM items i
        WHERE i.id = $1 AND i.user_id = $2
      `;
      queryParams.push(userId);
    }
    
    const result = await pool.query(query, queryParams);
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: userRole === 'admin' ? 'Item not found' : 'Item not found or access denied' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const { name, description } = await request.json();
    const userId = request.headers.get('X-User-ID');
    const userRole = request.headers.get('X-User-Role');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: No user ID provided' }, { status: 401 });
    }
    
    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }
    
    let checkQuery;
    let checkParams: any[] = [id];
    
    if (userRole !== 'admin') {
      checkQuery = 'SELECT id FROM items WHERE id = $1 AND user_id = $2';
      checkParams.push(userId);
    } else {
      checkQuery = 'SELECT id FROM items WHERE id = $1';
    }
    
    const checkResult = await pool.query(checkQuery, checkParams);
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: userRole === 'admin' ? 'Item not found' : 'Item not found or access denied' }, 
        { status: 404 }
      );
    }
    
    const result = await pool.query(
      'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const userId = request.headers.get('X-User-ID');
    const userRole = request.headers.get('X-User-Role');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: No user ID provided' }, { status: 401 });
    }
    
    let checkQuery;
    let checkParams: any[] = [id];
    
    if (userRole !== 'admin') {
      checkQuery = 'SELECT id FROM items WHERE id = $1 AND user_id = $2';
      checkParams.push(userId);
    } else {
      checkQuery = 'SELECT id FROM items WHERE id = $1';
    }
    
    const checkResult = await pool.query(checkQuery, checkParams);
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: userRole === 'admin' ? 'Item not found' : 'Item not found or access denied' }, 
        { status: 404 }
      );
    }
    
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    
    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 