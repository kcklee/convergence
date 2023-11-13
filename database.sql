CREATE DATABASE todos;

-- Create users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    hashed_password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

-- Create todos table
CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    task VARCHAR(255),
    category VARCHAR(255),
    current_status VARCHAR(255),
    todo_owner integer REFERENCES users (user_id)
);