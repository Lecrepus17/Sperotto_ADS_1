CREATE DATABASE livraria_db;
USE livraria_db;
CREATE TABLE livros (
 id INT AUTO_INCREMENT PRIMARY KEY,
 titulo VARCHAR(100),
 autor VARCHAR(100),
 ano_publicacao INT,
 criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE editoras (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100),
 cidade VARCHAR(100)
);
ALTER TABLE livros ADD editora_id INT;
ALTER TABLE livros ADD CONSTRAINT fk_editora FOREIGN KEY (editora_id)
REFERENCES editoras(id);

INSERT INTO editoras (nome, cidade) VALUES
('Editora Moderna', 'São Paulo'),
('Companhia das Letras', 'Rio de Janeiro');

INSERT INTO livros (titulo, autor, ano_publicacao, editora_id) VALUES
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 1943, 1),
('Dom Casmurro', 'Machado de Assis', 1899, 2),
('A Revolução dos Bichos', 'George Orwell', 1945, 1),
('Capitães da Areia', 'Jorge Amado', 1937, 2),
('1984', 'George Orwell', 1949, 1);
