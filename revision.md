### **Aula de Revisão PostgreSQL**

#### **1. Introdução ao PostgreSQL**

- **O que é PostgreSQL**: Sistema de banco de dados relacional avançado, Open Source, muito utilizado para aplicações web e grandes volumes de dados.
- **Conectar ao banco**:
  ```bash
  psql -U postgres
  ```
- **Criar um banco de dados**:
  ```sql
  CREATE DATABASE alunos_db;
  \c alunos_db; -- Conectar no banco de dados
  ```

---

#### **2. Criação e Manipulação de Tabelas**

- **Exemplo: Criar tabela de alunos**:

  ```sql
  CREATE TABLE alunos (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      data_nascimento DATE
  );
  ```

- **Inserir dados**:

  ```sql
  INSERT INTO alunos (nome, email, data_nascimento)
  VALUES ('Jessica Moura', 'jessica@email.com', '1990-05-15');
  ```

- **Verificar dados**:
  ```sql
  SELECT * FROM alunos;
  ```

---

#### **3. Operações CRUD SQL**

- **Criação (INSERT)**:

  ```sql
  INSERT INTO alunos (nome, email, data_nascimento)
  VALUES ('Carlos Silva', 'carlos@email.com', '1992-09-20');
  ```

- **Leitura (SELECT)**:

  ```sql
  SELECT * FROM alunos;
  SELECT nome, email FROM alunos WHERE id = 1;
  ```

- **Atualização (UPDATE)**:

  ```sql
  UPDATE alunos
  SET email = 'jessica.moura@email.com'
  WHERE id = 1;
  ```

- **Deleção (DELETE)**:
  ```sql
  DELETE FROM alunos WHERE id = 2;
  ```

---

#### **4. Constraints**

- **Exemplo de Constraint (not null, unique, check)**:

  ```sql
  ALTER TABLE alunos
  ADD CONSTRAINT chk_nome CHECK (LENGTH(nome) > 2); -- Garante que o nome tenha mais de 2 caracteres
  ```

- **Foreign Key** (preparando para o relacionamento):

  ```sql
  CREATE TABLE cursos (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL
  );

  ALTER TABLE alunos
  ADD COLUMN curso_id INT,
  ADD CONSTRAINT fk_curso FOREIGN KEY (curso_id) REFERENCES cursos (id);
  ```

---

#### **5. Relacionamentos entre Tabelas**

- **Inserir dados na tabela relacionada (cursos)**:

  ```sql
  INSERT INTO cursos (nome) VALUES ('Ciência da Computação');
  INSERT INTO alunos (nome, email, data_nascimento, curso_id)
  VALUES ('Ana Costa', 'ana@email.com', '1991-11-05', 1);
  ```

- **JOIN para ver dados relacionados**:
  ```sql
  SELECT a.nome AS aluno, c.nome AS curso
  FROM alunos a
  JOIN cursos c ON a.curso_id = c.id;
  ```

---

#### **6. Condicionais e Agregações**

- **Condicionais (WHERE)**:

  ```sql
  SELECT * FROM alunos WHERE curso_id = 1;
  ```

- **Agregações (COUNT, AVG, SUM)**:
  ```sql
  SELECT COUNT(*) FROM alunos;
  SELECT curso_id, COUNT(*) AS total_alunos FROM alunos GROUP BY curso_id;
  ```

---

#### **7. Manipulação Avançada**

- **Subqueries**:

  ```sql
  SELECT nome FROM alunos WHERE curso_id =
      (SELECT id FROM cursos WHERE nome = 'Ciência da Computação');
  ```

- **Manipular estruturas** (adicionar/alterar colunas):
  ```sql
  ALTER TABLE alunos ADD COLUMN telefone VARCHAR(20);
  ALTER TABLE alunos ALTER COLUMN nome SET NOT NULL;
  ```
