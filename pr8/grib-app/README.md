# Next.js CRUD Application with PostgreSQL

A simple CRUD (Create, Read, Update, Delete) application built with Next.js and PostgreSQL.

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL database

## Database Setup

1. Create a PostgreSQL database named `crudapp`:

```sql
CREATE DATABASE crudapp;
```

2. Initialize the database using the SQL script in `src/db/init.sql`:

```bash
psql -U postgres -d crudapp -f src/db/init.sql
```

Or you can run the SQL commands directly in your PostgreSQL client:

```sql
-- Drop the table if it exists
DROP TABLE IF EXISTS items;

-- Create the items table
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO items (name, description) VALUES
  ('Item 1', 'Description for item 1'),
  ('Item 2', 'Description for item 2'),
  ('Item 3', 'Description for item 3');
```

## Configuration

Update the database connection settings in `src/lib/db.ts` if needed:

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',          // Your PostgreSQL username
  host: 'localhost',         // Your PostgreSQL host
  database: 'crudapp',       // Your database name
  password: 'postgres',      // Your PostgreSQL password
  port: 5432,                // Your PostgreSQL port
});

export default pool;
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- View all items
- Add a new item
- Edit an existing item
- Delete an item

## Technologies Used

- Next.js (App Router)
- PostgreSQL
- Chakra UI
- Axios
