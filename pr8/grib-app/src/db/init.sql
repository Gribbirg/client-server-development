-- Drop the tables if they exist
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user'
);

-- Create the items table with user_id
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample users
INSERT INTO users (username, role) VALUES
  ('admin', 'admin'),
  ('user1', 'user'),
  ('user2', 'user');

-- Insert some sample data
INSERT INTO items (name, description, user_id) VALUES
  ('Item 1', 'Description for item 1', 1),
  ('Item 2', 'Description for item 2', 2),
  ('Item 3', 'Description for item 3', 2),
  ('Item 4', 'Description for item 4', 3); 