Render é uma plataforma de nuvem moderna que oferece uma variedade de serviços, como hospedagem de sites estáticos, aplicativos web dinâmicos, serviços de back-end, workwers programados e muito mais. Uma das características importantes do Render é sua capacidade de criar e gerenciar recursos de infraestrutura usando Docker. Isso permite que os desenvolvedores empacotem suas aplicações e suas dependências em um container, que pode ser facilmente transferido e executado em qualquer ambiente que suporte Docker.

Render já oferece soluções prontas para várias tecnologias e frameworks, como Node.js, Python, Ruby on Rails, entre outros. No entanto, para frameworks menos comuns ou mais novos, como NestJS, podemos precisar configurar nossos próprios Dockerfiles para implantar essas aplicações. Utilizarei o `NestJS` neste exemplo.

## Criando a aplicação NestJS

Vamos começar criando nossa aplicação NestJS. Você pode criar uma nova aplicação usando o CLI do NestJS com os seguintes comandos:

```bash
npm i -g @nestjs/cli
nest new my-app
```

## &#9888; IMPORTANTE &#9888;: Configurando a porta do aplicativo

Por padrão, os serviços web do Render escutam na porta 10000. Portanto, precisamos garantir que nossa aplicação NestJS também esteja configurada para ouvir nesta porta. Podemos fazer isso alterando a chamada para o método `listen` no arquivo `main.ts`:

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(10000);
}
bootstrap();
```

## Dockerfile

Agora, vamos criar nosso `Dockerfile`. Este arquivo nos permite definir as etapas necessárias para criar uma imagem Docker do nosso aplicativo, que pode ser implantada na plataforma Render.

```Dockerfile
FROM node:18

RUN npm i -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 10000

CMD ["npm", "run", "start:prod"]
```

Aqui está o que cada linha faz:

- `FROM node:18`: Este é o nosso ponto de partida, a imagem Docker que vamos usar para criar nosso container. Estamos usando a versão 18 do Node.js.

- `RUN npm i -g @nestjs/cli`: Este comando instala o NestJS CLI globalmente dentro do nosso container.

- `COPY package*.json ./`: Copia nossos arquivos `package.json` e `package-lock.json` (se houver) para o container.

- `RUN npm install`: Instala todas as dependências do nosso projeto no container.

- `COPY . .`: Copia o resto do nosso código para o container.

- `RUN npm run build`: Compila nossa aplicação NestJS.

- `EXPOSE 10000`: Informa ao Docker que nossa aplicação vai escutar na porta 10000.

- `CMD ["npm", "run", "start:prod"]`: Este é o comando que será executado quando o container for iniciado.

## Dockerignore

Finalmente, vamos criar nosso arquivo `.dockerignore`. Este arquivo permite especificar quais arquivos e pastas devem ser ignorados pelo Docker ao construir a imagem.

```dockerignore
dist/
node_modules/
```

Aqui estamos ignorando a pasta `dist/`, que contém nossa aplicação compilada, e a pasta `node_modules/`, que contém nossas dependências instaladas. Ignorar essas pastas garante que não estejamos copiando arquivos desnecessários para o nosso container.

Agora, com a nossa aplicação NestJS criada e configurada corretamente, estamos prontos para prosseguir com o deploy na plataforma Render.

## Fazendo o Deploy na Plataforma Render

Agora que temos nossa aplicação NestJS pronta e devidamente encapsulada em um Dockerfile, estamos prontos para fazer o deploy na plataforma Render.

### Passo 1: Push para o Repositório Git

Antes de iniciar o processo de deploy, certifique-se de que seu código (incluindo o Dockerfile e o .dockerignore) foi commitado e enviado para o seu repositório Git. O Render suporta tanto GitHub quanto GitLab.

### Passo 2: Criar um Novo Serviço Web no Render

1. Faça login na sua conta Render e clique em "New+" no canto superior direito da página do dashboard.
2. No menu suspenso, selecione "Web Service".
3. Na próxima página, você será solicitado a selecionar seu repositório. Faça isso e avance para a próxima etapa.

### Passo 3: Configurar o Serviço Web

1. Na página "Create Web Service", você terá várias opções para configurar seu serviço web. Vamos passar por elas:

    - **Name**: Este será o nome do seu serviço web. Pode ser qualquer coisa que você escolher.

    - **Region**: Selecione a região mais próxima no nosso caso `Ohio (US East)`.

    - **Branch**: Selecione a branch que servirá como base para criação do webservice na plataforma.

    - **Root Directory**: Pode deixar vazio.

    - **Runtime**: Selecione "Docker" como o runtime.

    - Por final escolha o tipo de maquina, no nosso caso a primeira que é a gratuíta.

2. Quando terminar de configurar tudo, clique em "Create Web Service" na parte inferior da página.

### Passo 4: Verifique o Status do Deploy

Depois de criar o serviço web, você será redirecionado para a página do serviço web onde poderá ver o status do seu deploy. Render irá clonar o repositório, construir a imagem Docker e iniciar o container. Se tudo correr bem, você verá uma marca de verificação verde ao lado do seu serviço na página do dashboard. Logo acima você verá uma url onde seu webservice está disponível.

E é isso! Você acabou de fazer o deploy de sua aplicação NestJS na plataforma Render utilizando Docker. Agora você pode acessar sua aplicação utilizando o URL fornecido pelo Render.

Acesse: [Meu repositório NestJS escrito para este desafio](https://github.com/viniciussantos45/nestjs-render-article)
Acesse: [URL de execução a partir do meu repositório](https://nestjs-render-article.onrender.com/users)

Qualquer dúvida pode deixar nos comentarios.

Obrigado pela leitura. Até a próxima.
