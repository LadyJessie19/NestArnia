SELECT * FROM products ORDER BY id;

-- a) Remova a coluna "store_id" da tabela de produtos.

ALTER TABLE products DROP COLUMN store_id;

-- b) Crie uma nova tabela "product_store" para ser a tabela pivô da relação N:N product - store.

CREATE TABLE products_store (
  product_id INT REFERENCES products(id),
  store_id INT REFERENCES store(id),
  PRIMARY KEY (product_id, store_id)
  );

-- c) Adicione valores a essa tabela.

INSERT INTO products_store (product_id, store_id) 
VALUES (2, 1);

-- d) Listar o nome e a cidade de todas as lojas que têm pelo menos um produto em estoque.
-- CREATE | READ | UPDATE | DELETE

SELECT p.name, s.name FROM products p
JOIN products_store ps ON p.id = ps.product_id
JOIN store s ON ps.store_id = s.id
WHERE p.in_stock = true;

-- e) Listar o nome e a cidade de todas as lojas que possuem produtos com avaliação média maior ou igual a 4.
SELECT s.name, s.city FROM store s
JOIN products_store ps ON s.id = ps.store_id
JOIN products p ON ps.product_id = p.id
JOIN evaluation e ON p.id = e.product_id
GROUP BY s.name, s.city
HAVING AVG(e.rating) >= 4;

-- f) Listar o nome e cidade de todas lojas que possuem produtos com preço superior a 50.

SELECT p.name, s.city FROM store s
JOIN products_store ps ON s.id = ps.store_id
JOIN products p ON ps.product_id = p.id
WHERE p.price > 150;

-- g) Obtenha o nome das lojas e o número total de avaliações registradas para cada loja.
--s.name, COUNT(e.id)
SELECT s.name, COUNT(e.id) FROM store s
JOIN products_store ps ON s.id = ps.store_id
JOIN products p ON ps.product_id = p.id
JOIN evaluation e ON p.id = e.product_id
GROUP BY s.name;

-- ** Desafio -> Listar o nome dos produtos e a média das classificações de avaliações para cada produto, considerando apenas os produtos que possuem pelo menos uma avaliação.

SELECT p.name, AVG(ROUND(e.rating)) FROM products p
JOIN evaluation e ON p.id = e.product_id
GROUP BY p.name
HAVING COUNT(p.id) > 0;
