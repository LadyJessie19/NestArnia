# NestArnia - Semana 4

## Tópicos da Semana 📚

- Autenticação e Autorização com NestJS;
- Criação e Manipulação de Entidades com TypeORM;
- Relacionamentos entre Tabelas;
- Validações e DTOs no NestJS;
- Proteção de Rotas com Guards;
- Geração e Verificação de JWTs.

## Exercícios 💻

| Data  | Tarefa 1                                                                                                        | Tarefa 2                                                      | Tarefa 3                                              | Tarefa 4                                                          | Tarefa 5                                                                                         |
| ----- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 30/09 | Criar método no service de users para buscar user pelo email, retornando a senha                                | Adicionar bcrypt para encriptar password usando @BeforeInsert | Criar um módulo para auth                             | Criar um controller e um service para auth                        |                                                                                                  |
| 01/10 | Criar rota para login, retornando um JWT token usando @nestjs/jwt                                               | Criar nova entidade Address (id, street, city, zipCode)       | Verificar se tabela Address foi criada corretamente   | Criar nova resource de Addresses                                  | Criar uma rota de POST de Addresses (com validações no dto)                                      |
|       | Criar rota de PATCH de Addresses                                                                                |                                                               |                                                       |                                                                   |                                                                                                  |
| 02/10 | Criar um auth guard para proteção das rotas                                                                     | Criar rota GET -> /users/profile utilizando o guard           |                                                       |                                                                   |                                                                                                  |
| 03/10 | Criar rota para buscar todos Adresses                                                                           | Adicionar relacionamento 1:1 com user na entidade Address     | Modificar rota profile do user para incluir o Address |                                                                   |                                                                                                  |
| 04/10 | Criar nova entidade Pet (id, name, age, breed -> obrigatórios e user (relacionamento N:1) -> não pode ser nulo) | Verificar se tabela Pet foi criada corretamente               | Criar rota para criação de Pets                       | Criar rota para buscar um pet pelo id, com informações do usuário | Modificar rota de PATCH de Addresses para que somente o usuário correspondente possa modificá-lo |

## **Happy coding!** 🚀
