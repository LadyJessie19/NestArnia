--a) Se não tiver criada, recriar a tabela de usuarios da aula anterior com os mesmos campos (id -> PK; name -> VARCHAR(32), age -> INTEGER).
CREATE TABLE IF NOT EXISTS usuarios (id SERIAL PRIMARY KEY, name VARCHAR(32), age INTEGER CHECK (age > 12));

--b) Adicionar mais uma coluna na tabela usuarios utilizando o ADD COLUMN (email -> VARCHAR(64))
ALTER TABLE usuarios ADD COLUMN email VARCHAR(64);

--c) Adicionar mais uma coluna na tabela usuarios utilizando o ADD COLUMN (isAdmin -> BOOLEAN DEFAULT FALSE)
ALTER TABLE usuarios ADD COLUMN isAdmin BOOLEAN DEFAULT FALSE;

--d) Alterar o nome da coluna "name" para "first_name"
ALTER TABLE usuarios RENAME name TO first_name;

--e) Adicionar mais uma coluna na tabela usuarios utilizando o ADD COLUMN (last_name -> VARCHAR(32) NOT NULL)
ALTER TABLE usuarios ADD COLUMN last_name VARCHAR(32) NOT NULL DEFAULT '';

--f) Fazer a criação de um ou mais usuários com idade maior que 20 anos.
INSERT INTO usuarios (first_name, age, email, last_name) VALUES 
('Isabelle', 25, 'isa@email.com', 'Moura'), ('Ana', 23, 'ana@email.com', 'Delfino');

--g) Deletar os usuarios com idade maior que 20 anos retornando tudo.
DELETE FROM usuarios where age > 20 RETURNING *;

--h) Altere o "isAdmin" de um dos usuarios para true.
UPDATE usuarios SET isAdmin = true WHERE id = 3;

--Desafio 1 -> Selecione todos os usuarios com o campo isAdmin = false ordenado pela idade.
SELECT * FROM usuarios WHERE isAdmin = false ORDER BY age DESC;

--Desafio 2 -> Selecione todos os usuarios e retorne a quantidade de usuarios (COUNT.)
SELECT COUNT(*) FROM usuarios;
