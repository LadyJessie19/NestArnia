-- a) Crie uma nova tabela "evaluation" ("ID" -> SERIAL PK, "description" TEXT, "rating" -> INT de 0 a 5 NOT NULL, "product_id" -> FK product.id com deleção em cascata)

CREATE TABLE evaluation (
  id SERIAL PRIMARY KEY,
  description TEXT,
  rating INT NOT NULL CHECK(rating BETWEEN 0 AND 5),
  product_id INT REFERENCES products(id) ON DELETE CASCADE);
  
-- b) Faça a inserção de dados nessa tabela criada referenciando os produtos avaliados (obrigatoriamente um deles sem descrição.)
  
INSERT INTO evaluation (description, rating, product_id)
VALUES ('Excelente produto', 5, 1), (NULL, 3, 2), ('Péssimo produto', 0, 3);

-- c) Selecione os dados da tabela de produtos juntamente com as de avaliações.

SELECT p.name, e.description, e.rating FROM 
products p JOIN evaluation e
ON p.id = e.product_id;

-- d) Selecione os produtos que tiveram avaliação igual ou acima de "rating" 4.

SELECT p.name, e.rating FROM products p
JOIN evaluation e ON p.id = e.product_id
WHERE e.rating <= 4;

-- e) Selecione os produtos que a avaliação = NULL.

SELECT p.name, e.description FROM products p
JOIN evaluation e ON p.id = e.product_id
WHERE e.description IS NULL;

-- f) Faça a contagem do total de linhas na tabela de avaliações.

SELECT COUNT(*) FROM evaluation;

-- g) Delete um dos produtos da tabela produtos.

DELETE FROM products WHERE id = 3;

insert into "public"."products" ("category", "description", "id", "in_stock", "name", "price") 
values ('padrão', 'Colchão ortopédico de luxo para noites de sono perfeitas', 3, 
        true, 'LuxuryDream King', 799.99)

-- h) Faça a contagem do total de linhas na tabela de avaliações.

SELECT COUNT(*) FROM evaluation;

-- i) Crie mais uma tabela para referenciar a tabela produtos "store" ("ID" -> SERIAL PK, "name" VARCHAR(64) NOT NULL, "city" -> VARCHAR(64))

CREATE TABLE store (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  city VARCHAR(64)
  )
  
-- j) Faça uma modificação na tabela de produtos para aceitar uma FK store_id.

ALTER TABLE products ADD COLUMN store_id INT REFERENCES store(id);

-- k) Adicione valores a tabela "store"

INSERT INTO store (name, city) VALUES ('Loja 1', 'Belo Horizonte'), ('Loja 2', 'Nova Cruz');

-- l) Faça um update na tabela de produtos para adicionar os ids das lojas criadas.

UPDATE products SET store_id = 1 WHERE id = 1;
UPDATE products SET store_id = 2 WHERE id = 2;

-- m) Selecione todas lojas que possuem produtos em estoque.

SELECT s.name, p.name FROM store s
JOIN products p ON s.id = p.store_id
WHERE p.in_stock = true;
