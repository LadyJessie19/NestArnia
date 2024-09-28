# NestArnia - Semana 3

## Tópicos da Semana 📚

- Manipulação de Tabelas com PostgreSQL;
- Relacionamentos N:N entre Tabelas;
- Operações com Tabelas Pivô;
- Agregações Avançadas com SQL;
- Criação e Manipulação de Tabelas com TypeORM;
- Validações e DTOs no NestJS;
- Operações CRUD com NestJS e PostgreSQL.

## Exercícios 💻

| Data   | Tarefa 1                                                                                         | Tarefa 2                                                               | Tarefa 3                                       | Tarefa 4                                                                                                                           | Tarefa 5                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Aula 1 | Remover a coluna "store_id" da tabela de produtos                                                | Criar tabela "product_store" como pivô (N:N)                           | Adicionar valores à tabela "product_store"     | Listar nome e cidade das lojas com produtos em estoque                                                                             | Listar nome e cidade das lojas com produtos avaliados com média >= 4                            |
|        | Listar nome e cidade de lojas com produtos com preço superior a 50                               | Obter o nome das lojas e o número total de avaliações registradas      |                                                |                                                                                                                                    |                                                                                                 |
| Aula 2 | Criar tabela "developers"                                                                        | Criar tabela "projects"                                                | Criar tabela pivô "developer_projects" (N:N)   | Inserir dados de "developer_projects"                                                                                              | Listar desenvolvedores e os projetos a que estão atribuídos                                     |
|        | Listar project_name e start_date de projetos com programadores com mais de 5 anos de experiência | Contar quantos programadores estão no projeto 'Mobile App Development' | Listar projetos sem programadores atribuídos   | Listar programadores atribuídos a projetos que começam com a letra "E", junto com suas habilidades e quantidade de projetos únicos |                                                                                                 |
| Aula 3 | Criar um novo projeto NestJS chamado "users_demo"                                                | Instalar TypeORM, @nestjs/typeorm e pg                                 | Configurar a conexão com o banco "arnia_users" | Verificar se o projeto está funcionando                                                                                            |                                                                                                 |
| Aula 4 | Criar a entidade "users" com campos id, email, password, createdAt                               | Verificar criação da tabela no banco                                   | Criar rota simples para adicionar um usuário   |                                                                                                                                    |                                                                                                 |
| Aula 5 | Adicionar validações na entidade "users" (email obrigatório, password com no mínimo 3 chars)     | Criar DTO para validação usando class-validator                        | Criar rota para listar todos os usuários       | Criar rota para buscar usuário por id                                                                                              | Criar rota para soft delete, alterando "isActive" para false; lançar exceção caso id não exista |
|        | Adicionar query para filtrar usuários ativos ou inativos na rota de busca                        |                                                                        |                                                |                                                                                                                                    |                                                                                                 |

## **Happy coding!** 🚀
