-- a) Crie uma tabela "developers" ("id" -> UUID PK; "name" -> VARCHAR(100) NOT NULL; "skills" -> VARCHAR(200) NOT NULL; "is_active" -> BOOLEAN DEFAULT TRUE; "experience_years" -> INT NOT NULL; "created_at" -> DATE DEFAULT NOW);

CREATE TABLE developers(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  skills VARCHAR(200) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  experience_years INT NOT NULL,
  created_at DATE DEFAULT NOW()
  );

-- b) Crie uma tabela "projects" ("id" -> UUID PK; "project_name" -> VARCHAR(100) NOT NULL; "start_date" -> DATE, "created_at" -> DATE DEFAULT NOW);

CREATE TABLE projects (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name VARCHAR(100) NOT NULL,
  start_date DATE,
  created_at DATE DEFAULT NOW()
);

-- c) Crie uma tabela pivô "developer_projects" para relacionar as duas primeiras tabelas N:N;

CREATE TABLE developers_projects (
  developer_id UUID REFERENCES developers(id),
  project_id UUID REFERENCES projects(id),
  PRIMARY KEY (developer_id, project_id)
  );

-- d) Insira os dados presentes em query2.sql

-- e) Popule a tabela de "developer_projects"

INSERT INTO developers_projects (developer_id, project_id)
VALUES ('0c27aedc-8433-45de-86ca-eff56b0c9ba5', '5040f76a-f6d9-441b-a033-371368e9313f'),
('1c3672a3-be2a-4d30-a2a5-4a36b5563905', '5040f76a-f6d9-441b-a033-371368e9313f'),
('453064aa-56a5-408a-967d-c3be5b317e16', '5040f76a-f6d9-441b-a033-371368e9313f');

-- f) Liste os programadores que estão atribuídos a projetos e mostre os nomes dos projetos aos quais estão atribuídos.

SELECT d.name, p.project_name FROM developers d
JOIN developers_projects dp ON d.id = dp.developer_id
JOIN projects p ON dp.project_id = p.id;

-- g) Liste o project_name e o start_date dos projetos que possuem pelo menos um programador com mais de 5 anos de experience_years.

SELECT d.name, p.project_name, p.start_date FROM projects p
JOIN developers_projects dp ON p.id = dp.project_id
JOIN developers d ON dp.developer_id = d.id
WHERE d.experience_years > 5;

-- h) Conte quantos programadores estão envolvidos no projeto com nome 'Mobile App Development'.

SELECT COUNT(d.id) AS developers_count FROM developers d
JOIN developers_projects dp ON d.id = dp.developer_id
JOIN projects p ON dp.project_id = p.id
WHERE p.project_name = 'Mobile App Development';

-- i) Liste os projetos que não têm programadores atribuídos.

SELECT P.project_name FROM projects p
LEFT JOIN developers_projects dp ON p.id = dp.project_id
WHERE dp.developer_id IS NULL;

-- ** Desafio -> Liste os programadores que estão atribuídos a projetos que têm nomes que começam com a letra 'E'. Para cada programador, mostre seu nome, suas habilidades e a quantidade de projetos únicos em que estão envolvidos.

SELECT d.name, d.skills, COUNT(DISTINCT p.id) FROM developers d
JOIN developers_projects dp ON d.id = dp.developer_id
JOIN projects p ON dp.project_id = p.id
WHERE p.project_name ILIKE 'm%'
GROUP BY d.name, d.skills;





