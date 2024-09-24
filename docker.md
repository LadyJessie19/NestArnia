# Comandos Básicos do Docker

## 1. **Listar containers em execução**

```bash
docker ps
```

Este comando lista todos os containers Docker em execução no momento.

## 2. **Listar todos os containers (em execução ou parados)**

```bash
docker ps -a
```

Este comando lista todos os containers, incluindo aqueles que estão parados.

## 3. **Criar e rodar um container**

```bash
docker run <options> <image>
```

O comando `docker run` cria e inicia um container a partir de uma imagem.

### Exemplo: Criar e rodar um container PostgreSQL

```bash
docker run --name my_postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres
```

#### Explicação:

- `--name my_postgres`: Define o nome do container como `my_postgres`.
- `-e POSTGRES_USER=myuser`: Define a variável de ambiente `POSTGRES_USER` com o valor `myuser`, que será o nome do usuário do banco.
- `-e POSTGRES_PASSWORD=mypassword`: Define a senha do usuário do banco, usando a variável de ambiente `POSTGRES_PASSWORD`.
- `-e POSTGRES_DB=mydatabase`: Cria o banco de dados inicial com o nome `mydatabase`.
- `-p 5432:5432`: Mapeia a porta `5432` do container para a porta `5432` da máquina host, permitindo acessar o banco de dados localmente.
- `-d`: Executa o container em segundo plano (modo "detached").
- `postgres`: É a imagem do PostgreSQL utilizada.

## 4. **Parar um container**

```bash
docker stop <container_id>
```

Este comando para um container em execução.

## 5. **Iniciar um container parado**

```bash
docker start <container_id>
```

Este comando inicia um container que foi previamente parado.

## 6. **Remover um container**

```bash
docker rm <container_id>
```

Remove um container. Você pode adicionar a flag `-f` para forçar a remoção de containers em execução.

## 7. **Verificar os logs de um container**

```bash
docker logs <container_id>
```

Exibe os logs de saída de um container.

## 8. **Acessar o shell de um container em execução**

```bash
docker exec -it <container_id> /bin/bash
```

Este comando abre um shell interativo (`bash`) dentro de um container.

## 9. **Listar imagens Docker baixadas**

```bash
docker images
```

Lista todas as imagens que estão disponíveis localmente no sistema.

## 10. **Remover uma imagem Docker**

```bash
docker rmi <image_id>
```

Remove uma imagem Docker localmente.

## 11. **Verificar o uso de espaço no Docker**

```bash
docker system df
```

Exibe o uso de disco pelos containers, imagens e volumes Docker.

## 12. **Remover volumes órfãos (não utilizados)**

```bash
docker volume prune
```

Remove volumes que não estão em uso por nenhum container.

## 13. **Remover todos os containers, volumes e imagens não utilizados**

```bash
docker system prune -a
```

Remove containers parados, volumes não utilizados, redes e todas as imagens que não estão sendo utilizadas.

## 14. **Criar uma imagem Docker a partir de um Dockerfile**

```bash
docker build -t <nome_da_imagem> <caminho_do_dockerfile>
```

Este comando constrói uma imagem Docker com base em um Dockerfile específico.

## 15. **Rodar um container interativo**

```bash
docker run -it <image> /bin/bash
```

Roda um container e entra diretamente no shell interativo (`bash`).
