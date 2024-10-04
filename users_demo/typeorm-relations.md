# Relacionamentos entre Tabelas no NestJS com TypeORM

## Introdução

Quando trabalhamos com banco de dados relacionais, como o PostgreSQL, é comum que diferentes tabelas estejam relacionadas entre si. No TypeORM, que é uma biblioteca ORM (Object-Relational Mapping), podemos definir esses relacionamentos diretamente nas nossas entidades. Nesta explicação, vamos ver como criar e entender os relacionamentos entre tabelas no NestJS com TypeORM.

## Tipos de Relacionamentos

Existem três tipos principais de relacionamentos entre tabelas:

1. **Um para Um (One to One)**
2. **Um para Muitos (One to Many)**
3. **Muitos para Muitos (Many to Many)**

### 1. Relacionamento Um para Um (One to One)

Um relacionamento "Um para Um" significa que uma linha em uma tabela está relacionada a apenas uma linha em outra tabela. Um exemplo típico seria um usuário e um endereço, onde cada usuário tem um endereço único.

#### Exemplo:

```typescript
// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Address) // Define o relacionamento
  @JoinColumn() // Define qual coluna será usada para o relacionamento
  address: Address;
}

// address.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;
}
```

No exemplo acima, a entidade `User` está relacionada com `Address` em um relacionamento "Um para Um". O decorator `@OneToOne()` define essa relação, e o `@JoinColumn()` indica qual coluna será usada para fazer a ligação.

### 2. Relacionamento Um para Muitos (One to Many)

Um relacionamento "Um para Muitos" significa que uma linha de uma tabela está relacionada a várias linhas em outra tabela. Um exemplo disso seria um usuário que pode ter vários pets.

#### Exemplo:

```typescript
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Pet, (pet) => pet.owner) // Define a relação com a entidade Pet
  pets: Pet[];
}

// pet.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.pets) // Define o lado inverso do relacionamento
  owner: User;
}
```

Neste exemplo, cada `User` pode ter muitos `Pets`, e cada `Pet` pertence a um único `User`. O `@OneToMany()` é usado para o lado "Um", e o `@ManyToOne()` para o lado "Muitos".

### 3. Relacionamento Muitos para Muitos (Many to Many)

Um relacionamento "Muitos para Muitos" ocorre quando várias linhas de uma tabela estão relacionadas a várias linhas de outra tabela. Um exemplo disso seria estudantes e cursos, onde muitos estudantes podem estar matriculados em muitos cursos.

#### Exemplo:

```typescript
// student.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Course) // Define o relacionamento
  @JoinTable() // Cria uma tabela intermediária para a relação
  courses: Course[];
}

// course.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Student, (student) => student.courses) // Define o relacionamento
  students: Student[];
}
```

Aqui, a tabela `Student` e a tabela `Course` estão em um relacionamento "Muitos para Muitos". O decorator `@ManyToMany()` define esse tipo de relacionamento e o `@JoinTable()` cria uma tabela intermediária para armazenar as associações.

---

# Anatomia dos Decorators de Relacionamentos no TypeORM

Quando usamos o TypeORM no NestJS, os relacionamentos entre tabelas são configurados através de _decorators_. Cada decorator define como as entidades (ou tabelas) se relacionam entre si e permite o mapeamento entre as classes e o banco de dados.

## Decorators Principais de Relacionamentos

Os principais decorators que usamos para criar relacionamentos entre entidades são:

- `@OneToOne`
- `@OneToMany`
- `@ManyToOne`
- `@ManyToMany`
- `@JoinColumn`
- `@JoinTable`

Agora vamos detalhar cada um deles, explicando sua anatomia e função.

### 1. `@OneToOne`

**Sintaxe Básica**:

```typescript
@OneToOne(type => TargetEntity, target => target.property, options)
```

#### Anatomia:

- `type => TargetEntity`: Informa o TypeORM qual é a entidade relacionada. Essa é uma função de callback que retorna a entidade com a qual o relacionamento está sendo feito.
- `target => target.property`: Define o campo inverso na entidade alvo (relacionada), ou seja, o que conecta de volta à entidade atual. É opcional, mas útil em relações bidirecionais.

- `options`: Define opções adicionais como `cascade`, `eager`, e `nullable`, que controlam o comportamento do relacionamento. Algumas opções comuns:
  - `cascade`: Permite que operações como `save` ou `remove` sejam propagadas para a entidade relacionada.
  - `eager`: Carrega automaticamente a entidade relacionada sempre que a principal for consultada.
  - `nullable`: Define se o campo pode ser `null`.

#### Exemplo:

```typescript
@OneToOne(() => Address)
@JoinColumn()
address: Address;
```

Aqui, estamos dizendo que a entidade `User` tem um relacionamento "Um para Um" com a entidade `Address`. O decorator `@JoinColumn()` indica qual campo vai armazenar a referência no banco de dados.

---

### 2. `@OneToMany`

**Sintaxe Básica**:

```typescript
@OneToMany(type => TargetEntity, target => target.property, options)
```

#### Anatomia:

- `type => TargetEntity`: Semelhante ao `@OneToOne`, especifica a entidade com a qual a relação é feita.

- `target => target.property`: Define o campo na entidade relacionada (muitos) que faz referência à entidade atual (um).

- `options`: As opções podem incluir `cascade`, `eager`, e outras que influenciam o comportamento do relacionamento.

#### Exemplo:

```typescript
@OneToMany(() => Pet, (pet) => pet.owner)
pets: Pet[];
```

Neste exemplo, a entidade `User` tem vários `Pets`, enquanto o lado "Muitos" do relacionamento é definido na entidade `Pet`. O campo `owner` em `Pet` é o que liga de volta à entidade `User`.

---

### 3. `@ManyToOne`

**Sintaxe Básica**:

```typescript
@ManyToOne(type => TargetEntity, target => target.property, options)
```

#### Anatomia:

- `type => TargetEntity`: Define a entidade com a qual este relacionamento "Muitos para Um" é feito.

- `target => target.property`: O campo na entidade "Um" que faz referência à entidade "Muitos".

- `options`: Semelhante aos outros decorators, controla o comportamento do relacionamento.

#### Exemplo:

```typescript
@ManyToOne(() => User, (user) => user.pets)
owner: User;
```

Aqui, o `Pet` pertence a um `User`. O lado "Muitos" está na entidade `Pet`, enquanto o lado "Um" está em `User`, que mantém a referência de volta com `pets`.

---

### 4. `@ManyToMany`

**Sintaxe Básica**:

```typescript
@ManyToMany(type => TargetEntity, target => target.property, options)
```

#### Anatomia:

- `type => TargetEntity`: Define a entidade com a qual este relacionamento "Muitos para Muitos" é feito.

- `target => target.property`: O campo na entidade alvo que faz referência à entidade atual.

- `options`: Opções adicionais para controlar o comportamento do relacionamento.

#### Exemplo:

```typescript
@ManyToMany(() => Course)
@JoinTable()
courses: Course[];
```

Aqui, um `Student` pode estar em muitos `Courses`, e um `Course` pode ter muitos `Students`. O `@JoinTable()` cria uma tabela intermediária que armazena essas associações.

---

### 5. `@JoinColumn`

**Sintaxe Básica**:

```typescript
@JoinColumn(options)
```

#### Anatomia:

- `options`: Definem detalhes do comportamento da coluna que armazena a chave estrangeira no relacionamento "Um para Um" ou "Muitos para Um". É mais utilizado no lado proprietário de um relacionamento (onde a chave estrangeira reside).

#### Exemplo:

```typescript
@OneToOne(() => Profile)
@JoinColumn()
profile: Profile;
```

O `@JoinColumn()` é obrigatório em relacionamentos "Um para Um" ou quando queremos especificar o lado que contém a chave estrangeira.

---

### 6. `@JoinTable`

**Sintaxe Básica**:

```typescript
@JoinTable(options)
```

#### Anatomia:

- `options`: Define as propriedades e nome da tabela intermediária que armazena os IDs de ambos os lados no relacionamento "Muitos para Muitos". As opções podem incluir o nome da tabela e os nomes das colunas para as chaves estrangeiras.

#### Exemplo:

```typescript
@ManyToMany(() => Tag)
@JoinTable({ name: 'post_tags' })
tags: Tag[];
```

Aqui, a tabela intermediária `post_tags` armazenará as relações entre `Post` e `Tag`.

---

## Conclusão

Os _decorators_ no TypeORM para definir relacionamentos entre entidades no NestJS fornecem uma maneira simples e expressiva de mapear as relações do mundo real no banco de dados. Cada _decorator_ tem uma função específica que ajuda a modelar as associações entre as tabelas e controlar como as entidades se comportam ao serem carregadas, salvas ou removidas.

Com essa compreensão da anatomia dos _decorators_, você estará pronto para lidar com relacionamentos complexos de maneira eficiente no NestJS.
