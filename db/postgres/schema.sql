CREATE DATABASE community;
\connect community;

DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS projects_users;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50),
  creator VARCHAR(50)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  city VARCHAR(75),
  country VARCHAR(75),
  fundedProjects INT,
  avatar TEXT
);

CREATE TABLE projects_users (
  id SERIAL PRIMARY KEY,
  users_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  projects_id INT NOT NULL REFERENCES projects (id) ON DELETE CASCADE
);
