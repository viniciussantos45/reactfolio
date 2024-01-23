Render is a modern cloud platform that offers a variety of services, such as hosting for static websites, dynamic web applications, backend services, scheduled workers, and more. One important feature of Render is its ability to create and manage infrastructure resources using Docker. This allows developers to package their applications and dependencies into a container, which can be easily transferred and run in any environment that supports Docker.

Render already offers ready-made solutions for various technologies and frameworks, such as Node.js, Python, Ruby on Rails, among others. However, for less common or newer frameworks like NestJS, we may need to configure our own Dockerfiles to deploy these applications. I will use `NestJS` in this example.

## Creating a NestJS Application

Let's start by creating our NestJS application. You can create a new application using the NestJS CLI with the following commands:

```bash
npm i -g @nestjs/cli
nest new my-app
```

## &#9888; IMPORTANT &#9888;: Configuring the Application Port

By default, Render's web services listen on port 10000. Therefore, we need to ensure that our NestJS application is also configured to listen on this port. We can do this by changing the call to the `listen` method in the `main.ts` file:

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(10000);
}
bootstrap();
```

## Dockerfile

Now, let's create our `Dockerfile`. This file allows us to define the steps needed to create a Docker image of our application, which can be deployed on the Render platform.

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

Here's what each line does:

- `FROM node:18`: This is our starting point, the Docker image we will use to create our container. We are using version 18 of Node.js.

- `RUN npm i -g @nestjs/cli`: This command installs the NestJS CLI globally within our container.

- `COPY package*.json ./`: Copies our `package.json` and `package-lock.json` files (if any) to the container.

- `RUN npm install`: Installs all the dependencies of our project in the container.

- `COPY . .`: Copies the rest of our code into the container.

- `RUN npm run build`: Compiles our NestJS application.

- `EXPOSE 10000`: Tells Docker that our application will listen on port 10000.

- `CMD ["npm", "run", "start:prod"]`: This is the command that will be executed when the container starts.

## Dockerignore

Finally, let's create our `.dockerignore` file. This file allows us to specify which files and folders should be ignored by Docker when building the image.

```dockerignore
dist/
node_modules/
```

We are ignoring the `dist/` folder, which contains our compiled application, and the `node_modules/` folder, which contains our installed dependencies. Ignoring these folders ensures that we are not copying unnecessary files into our container.

Now, with our NestJS application created and properly configured, we are ready to proceed with the deployment on the Render platform.

## Deploying on the Render Platform

Now that we have our NestJS application ready and properly encapsulated in a Dockerfile, we are ready to deploy on the Render platform.

### Step 1: Push to Git Repository

Before starting the deployment process, make sure your code (including the Dockerfile and .dockerignore) has been committed and pushed to your Git repository. Render supports both GitHub and GitLab.

### Step 2: Create a New Web Service on Render

1. Log in to your Render account and click on "New+" in the upper right corner of the dashboard page.
2. In the dropdown menu, select "Web Service".
3. On the next page, you will be prompted to select your repository. Do so and proceed to the next step.

### Step 3: Configure the Web Service

1. On the "Create Web Service" page, you will have several options to configure your web service. Let's go through them:

    - **Name**: This will be the name of your web service. It can be anything you choose.

    - **Region**: Select the nearest region, in our case `Ohio (US East)`.

    - **Branch**: Select the branch that will serve as the base for creating the web service on the platform.

    - **Root Directory**: Can be left empty.

    - **Runtime**: Select "Docker" as the runtime.

    - Finally, choose the type of machine, in our case, the first one, which is free.

2. When you finish configuring everything, click on "Create Web Service" at the bottom of the page.

### Step 4: Check the Deployment Status

After creating the web service, you will be redirected to the web service page where you can see the status of your deployment. Render will clone the repository, build the Docker image, and start the container. If all goes well, you will see a green checkmark next to your service on the dashboard page. Above it, you will see a URL where your web service is available.

And that's it! You have just deployed your NestJS application on the Render platform using Docker. Now you can access your application using the URL provided by Render.

Visit: [My NestJS repository written for this challenge](https://github.com/viniciussantos45/nestjs-render-article)
Visit: [Execution URL from my repository](https://nestjs-render-article.onrender.com/users)

Any questions, leave them in the comments.

Thank you for reading. Until next time.
