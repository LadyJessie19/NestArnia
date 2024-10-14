# Testes no Nest.js

Testes unitários são uma parte essencial do desenvolvimento de software, pois garantem que pequenas partes (unidades) do seu código funcionem como esperado. No NestJS, a biblioteca de testes mais comumente usada é o **Jest**, que vem pré-configurada quando você cria um projeto NestJS.

### 1. **O que são testes no NestJS?**

Os testes verificam o comportamento de uma parte específica do código (como uma função, um serviço ou um controlador) isoladamente. Em NestJS, usamos principalmente o Jest para escrever e rodar testes automatizados, pois ele oferece um ambiente robusto com várias ferramentas integradas, como mocks, espiões (spies) e stubs.

### 2. **Como usar o Jest no NestJS**

O Jest é instalado por padrão quando você cria um projeto NestJS, mas você pode verificar ou instalar manualmente com:

```bash
npm install --save-dev jest @types/jest ts-jest
```

O Jest é uma ferramenta de testes que fornece uma API simples para escrever e rodar testes. No NestJS, ele já vem configurado no arquivo `jest.config.js`.

### 3. **Estrutura e Sintaxe Básica de Testes**

Aqui está um exemplo básico de como seria a estrutura de um teste unitário no NestJS usando Jest:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MyService } from './my.service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyService],
    }).compile();

    service = module.get<MyService>(MyService);
  });

  it('should return a value', () => {
    const result = service.myMethod();
    expect(result).toBe('expectedValue');
  });
});
```

### 4. **Quando usar `describe` e `it`**

- `describe`: Serve para agrupar testes relacionados. Ele descreve um **conjunto de testes** sobre uma funcionalidade ou um comportamento.
- `it`: Define **um caso de teste individual**. Ele deve descrever uma unidade específica de comportamento que você está testando.

#### Exemplo:

```typescript
describe('Math operations', () => {
  it('should add numbers correctly', () => {
    const result = add(1, 2);
    expect(result).toBe(3);
  });

  it('should subtract numbers correctly', () => {
    const result = subtract(5, 3);
    expect(result).toBe(2);
  });
});
```

### 5. **Quando usar `.spec.ts` e `.test.ts`**

- `.spec.ts`: Usado no contexto de testes unitários. É o padrão adotado no NestJS para nomear arquivos de teste. Por convenção, todos os testes são escritos em arquivos com `.spec.ts`.
- `.test.ts`: Geralmente usado para outros tipos de testes, como testes de integração ou end-to-end, mas não é uma convenção estritamente seguida em NestJS. A comunidade tende a usar `.spec.ts`.

No NestJS, você verá principalmente arquivos de teste como `my-service.spec.ts`.

### 6. **Passo a Passo: Criando um Teste Simples no NestJS**

Vamos criar um exemplo de teste para um serviço que retorna uma string simples.

#### Passo 1: Criar o serviço

```typescript
// my-service.ts
export class MyService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

#### Passo 2: Criar o arquivo de teste

O arquivo de teste será `my-service.spec.ts`.

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MyService } from './my-service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyService],
    }).compile();

    service = module.get<MyService>(MyService);
  });

  it('should return "Hello World!"', () => {
    expect(service.getHello()).toBe('Hello World!');
  });
});
```

#### Passo 3: Rodar o teste

Você pode rodar os testes com o comando:

```bash
npm run test
```

### 7. **O que são Mocks, Spies e Stubs?**

Esses são conceitos importantes em testes unitários, pois ajudam a isolar o comportamento das funções testadas e a evitar que dependências externas interfiram nos testes.

- **Mocks**: São objetos "falsos" usados para simular dependências externas que um serviço pode ter. Em NestJS, quando você cria um mock, está criando um substituto para algo que o código testado depende.

  Exemplo:

  ```typescript
  const mockService = {
    getHello: jest.fn(() => 'Mock Hello!'),
  };
  ```

- **Spy (`spyOn`)**: Usamos um spy para observar se uma função foi chamada, quantas vezes foi chamada e com quais argumentos. Não muda o comportamento da função, apenas "espiona" as chamadas.

  Exemplo:

  ```typescript
  const spy = jest.spyOn(service, 'getHello');
  service.getHello();
  expect(spy).toHaveBeenCalled();
  ```

- **Stubs**: São semelhantes a mocks, mas em vez de substituir totalmente uma dependência, eles podem ser usados para fornecer comportamento "pré-programado" em métodos específicos.

### 8. **Exemplo: Mocks e SpyOn**

Aqui está um exemplo mais completo que usa mocks e spies:

#### Serviço:

```typescript
export class UserService {
  getUser(id: number): string {
    return `User ${id}`;
  }
}
```

#### Teste com `spyOn` e Mocks:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should call getUser method', () => {
    const spy = jest.spyOn(service, 'getUser');
    service.getUser(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should mock getUser method', () => {
    jest.spyOn(service, 'getUser').mockReturnValue('Mocked User');
    const result = service.getUser(2);
    expect(result).toBe('Mocked User');
  });
});
```

### 9. **Conclusão**

Testes unitários são fundamentais para garantir que seu código funcione corretamente. No NestJS, usamos o Jest para criar esses testes. O **`describe`** e **`it`** organizam os testes, enquanto **mocks**, **spies** e **stubs** ajudam a isolar o código das dependências. Sempre use `.spec.ts` para arquivos de teste no NestJS.

Esses conceitos permitem que você escreva testes robustos e mantenha a qualidade e a confiabilidade do seu código.
