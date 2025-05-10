import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';

// GET all items with role-based access control
export async function GET(request: NextRequest) {
  try {
    // Get user info from request headers (set by our AuthContext)
    const userId = request.headers.get('X-User-ID');
    const userRole = request.headers.get('X-User-Role');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: No user ID provided' }, { status: 401 });
    }
    
    let query;
    let params: any[] = [];
    
    // Admin can see all items with user information
    if (userRole === 'admin') {
      query = `
        SELECT i.*, u.username 
        FROM items i
        JOIN users u ON i.user_id = u.id
        ORDER BY i.id DESC
      `;
    } 
    // Regular users can only see their own items
    else {
      query = `
        SELECT i.* 
        FROM items i
        WHERE i.user_id = $1
        ORDER BY i.id DESC
      `;
      params = [userId];
    }
    
    const result = await pool.query(query, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST new item with user association
export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json();
    const userId = request.headers.get('X-User-ID');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: No user ID provided' }, { status: 401 });
    }

    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }
    
    const query = `
      INSERT INTO items (name, description, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await pool.query(query, [name, description, userId]);
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 