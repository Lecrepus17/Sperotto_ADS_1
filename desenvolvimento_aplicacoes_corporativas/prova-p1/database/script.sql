CREATE DATABASE voluntariado;

USE voluntariado;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  date DATE NOT NULL
);

CREATE TABLE volunteers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  event_id INT,
  FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Usuários fictícios
INSERT INTO users (email, password, role) VALUES
('admin@ifrs.edu.br', '$2b$10$Qe9Syz8nVCGYWO7nJ8JDyesu9pEgZuapHoWf.lfEGq/Jy.iL3ep8G', 'admin'),
('user@ifrs.edu.br', '$2b$10$A7MRI.2Ov8NfSpBCUQtu3egeKAACVczpSnqh338/OruHjeEzQo5Oy', 'user');
