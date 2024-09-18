# 🚀 Swagger Setup no Nest.js

O **Swagger** é uma ferramenta poderosa que permite documentar APIs REST de maneira automática e interativa. No Nest.js, configurar o Swagger é muito simples e prático. Este guia vai te mostrar como configurar e personalizar a documentação da sua API usando o Swagger.

## 📦 Instalação

Antes de mais nada, precisamos instalar os pacotes necessários:

```bash
npm install @nestjs/swagger swagger-ui-express
```

## ⚙️ Configurando o Swagger no `main.ts`

O próximo passo é configurar o Swagger no arquivo principal do seu projeto (`main.ts`).

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Api Example') // Título da API
    .setDescription('Api exemplo do repositório First') // Descrição da API
    .setVersion('1.0') // Versão da API
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Endpoint da documentação: /api

  await app.listen(3000);
}
bootstrap();
```

> 💡 **Dica**: Após essa configuração, a documentação estará disponível em [http://localhost:3000/api](http://localhost:3000/api).

---

## 📚 Definindo Grupos de Rotas

Para organizar as rotas no Swagger, podemos usar o decorator `@ApiTags`. Ele agrupa as rotas por entidade, tornando a documentação mais organizada.

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customers') // Nome do grupo no Swagger
@Controller('customers')
export class CustomersController {
  @Get()
  findAll() {
    return "Lista de clientes";
  }
}
```

---

## 🚦 Definindo Operações e Respostas

O decorator `@ApiOperation` é utilizado para descrever cada rota de forma mais clara no Swagger, enquanto o `@ApiResponse` define as possíveis respostas que essa rota pode retornar.

```typescript
import { Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiOperation({
  summary: 'Health check',
  description: 'Verifica se o banco de dados está funcionando',
})
@ApiResponse({
  status: 200,
  description: 'O banco de dados está funcionando',
})
@Get('health')
checkHealth() {
  return { status: 'Database is working' };
}
```

---

## 📝 Exemplo de Corpo da Requisição

Para documentar o corpo de uma requisição, podemos usar o decorator `@ApiBody` e definir um exemplo que será exibido no Swagger.

```typescript
import { Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

@ApiBody({
  schema: {
    properties: {
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'Doe' },
      age: { type: 'number', example: 30 },
    },
  },
})
@Post('create')
createCustomer() {
  return "Cliente criado";
}
```

---

## 🔎 Query Params

Quando sua rota recebe query parameters, você pode utilizar o decorator `@ApiQuery` para documentá-los de forma clara.

```typescript
import { Get } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

@ApiQuery({
  name: 'age',
  required: false,
  description: 'Idade do cliente',
  type: 'string',
})
@Get('search')
searchCustomers() {
  return "Busca de clientes";
}
```

---

## 🔗 Parâmetros de Rota

Se sua rota utiliza parâmetros de URL, como IDs, o decorator `@ApiParam` é a escolha certa para documentá-los.

```typescript
import { Get } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

@ApiParam({
  name: 'id',
  description: 'ID do cliente',
  type: 'number',
})
@Get(':id')
findCustomerById() {
  return "Detalhes do cliente";
}
```

---

## 🛠️ Customizando Ainda Mais

Você pode customizar o Swagger ainda mais, adicionando segurança, parâmetros globais e outros detalhes. Abaixo, um exemplo básico para adicionar autenticação JWT.

```typescript
const config = new DocumentBuilder()
  .setTitle('API Segura')
  .setDescription('Exemplo de API com JWT')
  .setVersion('1.0')
  .addBearerAuth() // Adiciona suporte ao JWT
  .build();
```

---

## 🎉 Conclusão

O Swagger é uma ferramenta essencial para documentar sua API de forma clara e interativa. Com a configuração no Nest.js, você pode:

- 📖 Documentar cada rota com detalhes.
- 🛠️ Definir grupos, query params, parâmetros de rota e respostas.
- 🧪 Permitir testes diretos na interface do Swagger.

---

👩‍💻 **Exemplo Completo no GitHub**  
Aqui está um repositório de exemplo com a configuração completa do Swagger:  
🔗 [Link para o Repositório](#)