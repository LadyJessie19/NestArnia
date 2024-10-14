# NestArnia - Semana 5

## Tópicos da Semana 📚

- Criação de rotas para pets e filtragem por query;
- Manipulação de entidades com relacionamentos (Pets e Users, Events e Users);
- Paginação de rotas;
- Uso de decoradores personalizados (CurrentUser);
- Upload e gerenciamento de imagens;
- Criação de entidades com relacionamentos (N:N);
- Validação e filtragem de dados via query (eventDate);
- Documentação de APIs com NestJS;
- Testes unitários simples (funções de soma e multiplicação);
- Criação de DER (Diagrama Entidade-Relacionamento) da aplicação.

## Exercícios 💻

| Data  | Tarefa 1                                                                             | Tarefa 2                                                                              | Tarefa 3                                                                                      | Tarefa 4                                                                           | Tarefa 5                                                             |
| ----- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 07/10 | Criar rota GET -> /pets que retorna todos os pets, com query para filtrar pela breed | Adicionar informações dos pets na rota de perfil                                      | Criar rota de update de pets (somente o dono do pet pode modificá-lo)                         | Criar rota GET -> /pets/my-pets para retornar os pets do usuário logado            |                                                                      |
| 08/10 | Criar entidade Events (id, eventName, eventDate, participants (N:N com users))       | Criar rota POST -> /events                                                            | Criar rota para o usuário participar de um evento (sugestão: POST -> /events/:id/participate) | Incluir eventos na rota de perfil do usuário                                       | **Desafio:** Implementar paginação na rota de get de Pets            |
| 09/10 | Criar um decorator CurrentUser para substituir req.user nas rotas                    | Criar rota GET -> /events                                                             |                                                                                               | **Desafio:** Filtrar eventos pela data (eventDate) a partir de uma data específica |                                                                      |
| 10/10 | Criar rota para envio de imagens do evento                                           | Criar rota GET para retornar a imagem pelo nome                                       | Criar nova entidade Images (id, imageLink, eventId)                                           |                                                                                    |                                                                      |
| 11/10 | Criar um service para relacionar imagem com evento existente                         | Criar rota GET -> /events/:id que mostra o evento e os links das imagens relacionadas |                                                                                               |                                                                                    |                                                                      |
| 12/10 | Criar rota para editar a data de um evento existente                                 | Documentar a aplicação                                                                | Fazer o DER da aplicação                                                                      | **Desafio:** Criar um teste simples para uma função de soma                        | **Desafio:** Criar um teste simples para uma função de multiplicação |

## **Happy coding!** 🚀
