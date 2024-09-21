-- a) Crie uma nova tabela "products" ("ID" -> SERIAL PK; "name" -> VARCHAR(100) NOT NULL; "description" VARCHAR(255); "in_stock" -> BOOLEAN NOT NULL; "price" FLOAT)
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  in_stock BOOLEAN NOT NULL,
  price FLOAT
  );

-- b) Utilize a query em query.sql para popular a tabela "products"

-- c) Selecione todas colunas dos produtos que começam com a letra "S".
SELECT * FROM products WHERE name ILIKE 's%';

-- d) Selecione a conta dos produtos que começam com a letra "S".
SELECT COUNT(*) FROM products WHERE name ILIKE 's%';

-- e) Selecione o produto com maior "price".
SELECT * FROM products ORDER BY price DESC LIMIT 1;
-- ou
SELECT MAX("price") FROM "products";

-- f) Faça a soma de todos "price".
SELECT ROUND(SUM(CAST(price AS NUMERIC)), 2) FROM products;

-- g) Selecione todas colunas de todos produtos ordenando por "name".
SELECT * FROM products ORDER BY name;

-- h) Selecione todos produtos com "in_stock" = true agrupando por "in_stock"
SELECT in_stock, count(*) AS products_count from products GROUP BY in_stock;
-- para verificar a quantidade de produtos na tabela
SELECT COUNT(*) FROM products;

-- i) Retorne a média do "price" de todos produtos.
SELECT ROUND(AVG(CAST(price AS NUMERIC)), 2) FROM products;

-- ** Desafio 1 -> Adicione mais uma coluna (category -> VARCHAR(60))
ALTER TABLE products ADD COLUMN category VARCHAR(60);

-- ** Desafio 2 -> Atualize essa coluna para que ela não aceite valores nulos (Fazer a correção necessária para a query funcionar adicionando a constraint)
-- passo 1: alterar todas as ocorrências com o valor 'padrão'
UPDATE products SET category = 'padrão' WHERE category IS null;
-- passo 2: adicionar uma constraint setando um valor padrão para a coluna
ALTER TABLE products ALTER COLUMN category SET DEFAULT 'padrão';
-- passo 3: adicionar uma constraint que impeça que a coluna aceite valores nulos na sua criação
ALTER TABLE products ALTER COLUMN category SET NOT NULL;