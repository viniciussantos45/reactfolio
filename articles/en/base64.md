When we face the task of rendering images in our web applications, it is common to encounter the need to send and receive images through HTTP requests. A common practice is to use Base64 encoding to convert the image into a string and include it directly in the request response. However, this approach may not be the most efficient, and in this article, we will explain why. In addition, we will show a correct implementation using NestJS and the Streamable approach to render images from the file name passed as a parameter.

## Why not return Base64 in an HTTP request response

1. Increase in response size: Base64 encoding increases the file size by about 33%, which can lead to an increase in loading time and user data consumption.

2. Difficulty in caching: Images encoded in Base64 are not cached by the browser, resulting in slower loading and additional server resource consumption.

3. Lower efficiency in decoding: Decoding Base64 strings is less efficient than direct loading of binary files, potentially increasing processing time on the client side.

**Problem:**
**_Suppose we have a route that should return a list of users and we must bring along each item in this list the avatar of each user. Imagine for each item retrieved from the database, I have to get the image file from the storage, convert it to base64, and insert it into the body of the return request... In addition to being costly for the server to convert these images, the HTTP response body of the request will become huge as the size of the list increases._**

**Solution:**
To circumvent the problems mentioned above, a more efficient approach is to use streams to send a binary image file directly in the HTTP request response. We will create an implementation using the NestJS framework, which is the framework I am currently using. **If you want me to make an explanation using only Express, say here in the comments section.**

I left in my GitHub a [repository](https://github.com/viniciussantos45/image-file-stream-nestjs) with the implementation of the solution for you to clone and follow the application and test it yourself.

```cmd
git clone https://github.com/viniciussantos45/image-file-stream-nestjs.git

cd image-file-stream-nestjs

yarn 
yarn start:dev
```

_`yarn`: Installs all necessary dependencies_
_`yarn start:dev`: Runs our API on port 3000_

## Solution Implementation

Now I will explain how everything is structured in the application.

In the `src/app.module.ts` file, which is the main file, we have the following:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';

// The AppModule class is the root of the module and configures all the dependencies and functionalities of the application.
@Module({
  imports: [
    // Configuring TypeORM to connect to the SQLite database.
    TypeOrmModule.forRoot({
      type: 'sqlite',                    // Specifies the database type: SQLite.
      database: 'database.sqlite',       // Database file name.
      entities: [join(__dirname, '**', '*.entity.{ts,js}')], // Indicates where to find the TypeORM entity (model) files.
      synchronize: true,                 // Enables database schema synchronization.
      logging: true,                     // Enables log recording for TypeORM operations.
    }),
    FileModule,                          // Imports the FileModule to be used in the application.
  ],
  controllers: [AppController],          // Defines the root controller of the application.
  providers: [AppService],               // Defines the root service of the application.
})
export class AppModule {}                // Exports the AppModule class to be imported and used by other modules.
```

In our file `src/file/file.module.ts`, we have the definition of the `FileModule` class with the basic dependency injection structure of NestJS. In this class, we have the declaration of its respective `providers` (service that contains the methods with the business rules of the module) and `controllers` (where the application routes are defined).

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { File } from './file.entity';
import { FileService } from './file.service';

@Module({
  imports: [
    // Links the File entity to the TypeOrmModule for use by TypeORM.
    TypeOrmModule.forFeature([File]),
  ],
  controllers: [FileController], // Defines the specific controller for this module (FileController).
  providers: [FileService],      // Defines the specific service for this module (FileService).
})
export class FileModule {}       // Exports the FileModule class to be imported and used by other modules.
```

The `src/file/file.entity.ts` file is responsible for declaring our "File" model and defining the necessary columns to save the information of our image in the database.

```typescript
import { IsString } from 'class-validator';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @IsString()
  url: string; // this is a virtual field used only to store the URL with the route that should be accessed by the client to access the image. This field is filled in the method below.

  // These decorators ensure that we always have the URL filled with a link to the route (defined in file.controller.ts) when we perform an operation with the database
  @AfterInsert() // Calls the method below when a record is inserted in the file table (i.e., along with the .save() method).
  @AfterLoad() // Calls the method below when a record is loaded (i.e., along with the .find() method).
  @AfterUpdate() // Calls the method below when a record is updated (i.e., along with the .update() method).
  imageUrl(): void {
    this.url = `http://localhost:3000/file/image/${this.filename}`;
  }
}
```

The `src/file/file.controller.ts` file is responsible for defining our necessary routes **and this is where the magic happens**. See after the code for a detailed explanation.

```typescript
import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { File } from './file.entity';
import { FileService } from './file.service';

// The FileController class defines the routes and logic related to files in the application.
@Controller('file')
export class FileController {
  // Injects FileService into the controller.
  constructor(private readonly filesService: FileService) {}

  // Defines the POST route for file uploads.
  @Post('upload')
  // Applies FileInterceptor to handle file upload and save it in the 'userfiles' folder.
  @UseInterceptors(FileInterceptor('file', { dest: 'userfiles' }))
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<File> {
    // Calls the file service to handle the upload and return the file entity.
    return this.filesService.upload(file);
  }

  // Defines the GET route to get an image by filename.
  @Get('image/:filename')
  // Adds the 'Content-Type' header as 'image' in the response.
  @Header('Content-Type', 'image')
  getImage(@Param('filename') filename: string): StreamableFile {
    // Calls the file service to get the image path.
    const file = this.filesService.getImage(filename);

    // Returns the image as a StreamableFile, which will be sent as a response.
    return new StreamableFile(createReadStream(file));
  }
}
```

The POST route `/file/upload` uses the `@UseInterceptors` decorator with the `FileInterceptor` to handle file uploads. The `FileInterceptor` is configured to process a single file named 'file' and store it in the 'userfiles' folder. When a file is sent to this route, it is passed to the `uploadFile` method, which in turn uses the `FileService` to save the file and store information about it in the database.

The GET route `/file/image/:filename` is used to retrieve images by filename. The `@Header` decorator is used to set the 'Content-Type' header of the response as 'image', informing the client that the content is an image. The `getImage` method retrieves the image using the `FileService`, which returns the file path in the file system. Then, the `createReadStream` method of the 'fs' module is used to create a read stream (ReadStream) from the file. The `StreamableFile` object is instantiated with this read stream, allowing the image to be sent directly to the client in stream format, optimizing transfer and reducing memory usage.

Any image is accessible from the following route: `http://localhost:3000/file/image/filename` where `filename` is the filename is a hash that was saved in the File entity from our upload route. And this route is returned when we perform a find on the File entity.

In the file `src/file/file.service.ts`, we have the business logic for file manipulation.

```typescript
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import mime from 'mime-types';
import { join } from 'path';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
  // Injects the TypeORM repository for the File entity.
  constructor(
    @InjectRepository(File)
    private repository: Repository<File>,
  ) {}

  // Asynchronous function to upload a file.
  async upload(file: Express.Multer.File): Promise<File> {
    // Determines the file extension based on its MIME type.
    const extension = mime.extension(file.mimetype) as string;

    // Checks if the file extension is allowed (only .jpg and .png are allowed).
    if (!['png', 'jpg'].includes(extension)) {
      // If the extension is not allowed, throws an exception with an error message and HTTP status 400 (Bad Request).
      throw new HttpException(
        'Only .jpg or .png image uploads are allowed!',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Creates a new File entity with the filename.
    const file_created = this.repository.create({
      filename: file.filename,
    });

    // Saves the File entity in the database and returns the result.
    return await this.repository.save(file_created);
  }

  // Function to get the path of an image by filename.
  getImage(filename: string): string {
    // Returns the full path of the file, combining the current directory, 'userfiles' folder, and filename.
    return join(process.cwd(), 'userfiles', filename);
  }
}
```

The `upload` method accepts an `Express.Multer.File` as an argument and checks its extension using the `mime-types` library. It ensures that only .jpg or .png image files are accepted, throwing a `HttpException` with an error message and `HttpStatus.BAD_REQUEST` status if the extension is not allowed. If the extension is valid, the method creates a new record in the database with the filename and saves it using the `File` repository, returning a `Promise` with the saved file record.

The `getImage` method takes a filename as an argument and returns the absolute path of the file in the file system. It uses the `join` function from the 'path' module to construct the path, combining the current process directory (`process.cwd()`), the 'userfiles' folder, and the provided filename. This allows the `FileController` to use the path returned by `getImage` to create a read stream (ReadStream) with the `createReadStream` function of the 'fs' module and instantiate a `StreamableFile` object with this stream. The `StreamableFile` is then sent to the client as a stream response, optimizing the transfer and reducing memory usage. This approach ensures that images are correctly sent to the client, with efficient file type checking and optimized data transfer handling.

## Security Tips on This Implementation

In the provided code, we are not applying all these security practices, but it's important to remember to consider them when developing a file management system:

1. Check the extension and content of files to ensure only valid images are uploaded. See the [file-type](https://www.npmjs.com/package/file-type) library, for example.
2. Protect against Denial of Service (DoS) attacks by limiting the size of files and the rate of upload requests. You can do this by implementing a solution in the code and still limit it on your traffic server (like NGINX).
3. Implement authentication and authorization mechanisms to allow only access by authorized users. JWT authentication, for example.
4. Avoid exposing absolute file paths to the client and handle potential errors, such as files not found.

Including these security tips in your application can help protect your system and your users. A more comprehensive security analysis is always recommended.

And so we conclude our implementation, any questions, suggestions, or criticism, leave in the comments. Thank you for reading.
