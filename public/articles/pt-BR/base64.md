Quando nos deparamos com a tarefa de renderizar imagens em nossas aplicações web, é comum encontrarmos a necessidade de enviar e receber imagens através de requisições HTTP. Uma prática comum é utilizar a codificação Base64 para converter a imagem em uma string e incluí-la diretamente na resposta da requisição. No entanto, essa abordagem pode não ser a mais eficiente e, neste artigo, vamos explicar o porquê. Além disso, mostraremos uma implementação correta usando o NestJS e a abordagem Streamable para renderizar imagens a partir do nome do arquivo passado como parâmetro.

## Por que não retornar Base64 em uma resposta de requisição HTTP

1. Aumento do tamanho da resposta: A codificação Base64 aumenta o tamanho do arquivo em cerca de 33%, o que pode levar a um aumento no tempo de carregamento e no consumo de dados do usuário.

2. Dificuldade no cache: As imagens codificadas em Base64 não são cacheadas pelo navegador, resultando em um carregamento mais lento e consumo adicional de recursos do servidor.

3. Menor eficiência na decodificação: A decodificação de strings Base64 é menos eficiente do que o carregamento direto de arquivos binários, podendo aumentar o tempo de processamento no lado do cliente.

**Problema:**
**_Suponha que temos uma rota que deve retornar uma lista de usuários e que devemos trazer junto a cada item desta lista o avatar de cada usuário. Imagina pra cada item recuperado do banco de dados, devo pegar o arquivo da imagem no storage, converte-la para base64 e inserir no corpo de retorno da requisição... Além de ser custoso para o servidor converter essas imagens, o corpo de resposta HTTP da requisição ficará enorme conforme o tamanho da lista vai aumentando._**

**Solução:**
Para contornar os problemas mencionados acima, uma abordagem mais eficiente é usar streams para enviar um arquivo binário da imagem diretamente na resposta da requisição HTTP. Vamos criar uma implementação utilizando o framework NestJS que é o framework que estou utilizando ultimamente. **Caso queiram que eu faça uma explicação apenas utilizando o Express diga aqui na sessão de comentários.**

Eu deixei no meu GitHub um [repositório](https://github.com/viniciussantos45/image-file-stream-nestjs) com a implentação da solução de um clone para acompanhar a aplicação e testar você mesmo.

```cmd
git clone https://github.com/viniciussantos45/image-file-stream-nestjs.git

cd image-file-stream-nestjs

yarn 
yarn start:dev
```

_`yarn`: Instala todas dependencias necessárias_
_`yarn start:dev`: Executa nossa api na porta 3000_

## Implementação de solução

Agora explicarei como tudo está sendo estruturado na aplicação.

No arquivo `src/app.module.ts` que é o arquivo principal temos os seguinte:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';

// A classe AppModule é a raiz do módulo e configura todas as dependências e funcionalidades do aplicativo.
@Module({
  imports: [
    // Configurando o TypeORM para se conectar à base de dados SQLite.
    TypeOrmModule.forRoot({
      type: 'sqlite',                    // Especifica o tipo de banco de dados: SQLite.
      database: 'database.sqlite',       // Nome do arquivo do banco de dados.
      entities: [join(__dirname, '**', '*.entity.{ts,js}')], // Indica onde encontrar os arquivos de entidade (models) do TypeORM.
      synchronize: true,                 // Habilita a sincronização do esquema do banco de dados.
      logging: true,                     // Habilita o registro de log para operações do TypeORM.
    }),
    FileModule,                          // Importa o módulo FileModule para ser usado no aplicativo.
  ],
  controllers: [AppController],          // Define o controlador raiz do aplicativo.
  providers: [AppService],               // Define o serviço raiz do aplicativo.
})
export class AppModule {}                // Exporta a classe AppModule para ser importada e usada por outros módulos.
```

No nosso arquivo `src/file/file.module.ts` temos a definição da classe `FileModule` com a esturura básica de injeção de dependências do NestJS. Nesta classe temos a declaração de seus devidos `providers`(service que contem os métodos com as regras de negócio do módulo) e `controllers`(onde são definidas as rotas da aplicação).

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { File } from './file.entity';
import { FileService } from './file.service';

@Module({
  imports: [
    // Vincula a entidade File ao TypeOrmModule para ser utilizada pelo TypeORM.
    TypeOrmModule.forFeature([File]),
  ],
  controllers: [FileController], // Define o controlador específico para este módulo (FileController).
  providers: [FileService],      // Define o serviço específico para este módulo (FileService).
})
export class FileModule {}       // Exporta a classe FileModule para ser importada e usada por outros módulos.

```

O arquivo `src/file/file.entity.ts` é o arquivo responsável por declarar nossa model "File" e definir as colunas necessárias para salvar as informações da nossa imagem no banco de dados.

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
  url: string; // este é uma campo virtual utilizado apenas para armazenar a url com a rota que deve ser acessada pelo client para acessar a imagem. Este campo é preenchido no metodo abaixo.

  // Estes decorators garantem que a gente sempre tenha a url preenchida com um link para a rota(definida no file.controller.ts) quando a gente faz uma operação com o banco de dados
  @AfterInsert() // Chama o metodo abaixo quando um registro é inserido na tabela file (ou seja junto ao metodo .save()). 
  @AfterLoad() // Chama o metodo abaixo quando um registro é carregado (ou seja junto ao metodo .find()).
  @AfterUpdate() // Chama o metodo abaixo quando um registro é atualizado (ou seja junto ao metodo .update()).
  imageUrl(): void {
    this.url = `http://localhost:3000/file/image/${this.filename}`;
  }
}

```

O arquivo `src/file/file.controller/ts` é responsável por definir nossas rotas necessárias **e é aqui que a mágica acontece**. Veja depois do código a explicação detalhada.

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

// A classe FileController define as rotas e lógica relacionadas aos arquivos no aplicativo.
@Controller('file')
export class FileController {
  // Injeta o FileService no controlador.
  constructor(private readonly filesService: FileService) {}

  // Define a rota POST para upload de arquivos.
  @Post('upload')
  // Aplica o FileInterceptor para lidar com o upload de arquivo e salvá-lo na pasta 'userfiles'.
  @UseInterceptors(FileInterceptor('file', { dest: 'userfiles' }))
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<File> {
    // Chama o serviço de arquivos para lidar com o upload e retornar a entidade de arquivo.
    return this.filesService.upload(file);
  }

  // Define a rota GET para obter uma imagem por nome de arquivo.
  @Get('image/:filename')
  // Adiciona o cabeçalho 'Content-Type' como 'image' na resposta.
  @Header('Content-Type', 'image')
  getImage(@Param('filename') filename: string): StreamableFile {
    // Chama o serviço de arquivos para obter o caminho da imagem.
    const file = this.filesService.getImage(filename);

    // Retorna a imagem como um arquivo StreamableFile, que será enviado como resposta.
    return new StreamableFile(createReadStream(file));
  }
}
```

A rota POST `/file/upload` utiliza o decorator `@UseInterceptors` com o `FileInterceptor` para lidar com o upload de arquivos. O `FileInterceptor` é configurado para processar um único arquivo chamado 'file' e armazená-lo na pasta 'userfiles'. Quando um arquivo é enviado a essa rota, ele é passado para o método `uploadFile`, que por sua vez utiliza o serviço `FileService` para salvar o arquivo e armazenar informações sobre ele no banco de dados.

A rota GET `/file/image/:filename` é usada para recuperar imagens pelo nome do arquivo. O decorator `@Header` é usado para definir o cabeçalho 'Content-Type' da resposta como 'image', informando ao cliente que o conteúdo é uma imagem. O método `getImage` recupera a imagem utilizando o serviço `FileService`, que retorna o caminho do arquivo no sistema de arquivos. Em seguida, o método `createReadStream` do módulo 'fs' é usado para criar um fluxo de leitura (ReadStream) a partir do arquivo. O objeto `StreamableFile` é instanciado com esse fluxo de leitura, permitindo que a imagem seja enviada diretamente ao cliente em formato de stream, otimizando a transferência e reduzindo o uso de memória.

Qualquer imagem é acessível a partir da seguinte rota: `http://localhost:3000/file/image/filename` onde `filename` é o filename é um hash que foi salvo na entidade File a partir da nossa rota de upload. E esta rota é retornada quando executamos um find na entidade File.

No arquivo `src/file/file.service.ts` temos a regra de negócio para manipulação dos arquivos.

```typescript
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import mime from 'mime-types';
import { join } from 'path';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
  // Injeta o repositório TypeORM para a entidade File.
  constructor(
    @InjectRepository(File)
    private repository: Repository<File>,
  ) {}

  // Função assíncrona para fazer o upload de um arquivo.
  async upload(file: Express.Multer.File): Promise<File> {
    // Determina a extensão do arquivo com base no seu tipo MIME.
    const extension = mime.extension(file.mimetype) as string;

    // Verifica se a extensão do arquivo é permitida (apenas .jpg e .png são permitidos).
    if (!['png', 'jpg'].includes(extension)) {
      // Se a extensão não for permitida, lança uma exceção com uma mensagem de erro e o status HTTP 400 (Bad Request).
      throw new HttpException(
        'É permitido apenas upload de imagens .jpg ou .png !',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Cria uma nova entidade File com o nome do arquivo.
    const file_created = this.repository.create({
      filename: file.filename,
    });

    // Salva a entidade File no banco de dados e retorna o resultado.
    return await this.repository.save(file_created);
  }

  // Função para obter o caminho de uma imagem pelo nome do arquivo.
  getImage(filename: string): string {
    // Retorna o caminho completo do arquivo, combinando o diretório atual, a pasta 'userfiles' e o nome do arquivo.
    return join(process.cwd(), 'userfiles', filename);
  }
}
```

O método `upload` aceita um arquivo `Express.Multer.File` como argumento e verifica sua extensão usando a biblioteca `mime-types`. Ele garante que apenas arquivos de imagem .jpg ou .png sejam aceitos, lançando uma exceção `HttpException` com uma mensagem de erro e o status `HttpStatus.BAD_REQUEST` se a extensão não for permitida. Se a extensão for válida, o método cria um novo registro no banco de dados com o nome do arquivo e o salva usando o repositório `File`, retornando uma `Promise` com o registro do arquivo salvo.

O método `getImage` recebe um nome de arquivo como argumento e retorna o caminho absoluto do arquivo no sistema de arquivos. Ele usa a função `join` do módulo 'path' para construir o caminho, combinando o diretório atual do processo (`process.cwd()`), a pasta 'userfiles' e o nome do arquivo fornecido. Isso permite que o controlador `FileController` use o caminho retornado por `getImage` para criar um fluxo de leitura (ReadStream) com a função `createReadStream` do módulo 'fs' e instancie um objeto `StreamableFile` com esse fluxo. O `StreamableFile` é então enviado ao cliente como uma resposta em formato de stream, otimizando a transferência e reduzindo o uso de memória. Essa abordagem garante que imagens sejam enviadas corretamente ao cliente, com uma verificação eficiente de tipos de arquivos e tratamento otimizado de transferência de dados.

## Dicas de segurança sobre esta implementação

No código fornecido, não estamos aplicando todas essas práticas de segurança, mas é importante lembrar de considerá-las ao desenvolver um sistema de gerenciamento de arquivos:

1. Verifique a extensão e o conteúdo dos arquivos para garantir que apenas imagens válidas sejam enviadas. Veja a lib [file-type](https://www.npmjs.com/package/file-type) por exemplo.
2. Proteja-se contra ataques de negação de serviço (DoS) limitando o tamanho dos arquivos e a taxa de solicitações de upload. Você pode fazer isso implementando uma solução no código e ainda sim limitar no seu servidor de tráfego(no NGINX por exemplo).
3. Implemente mecanismos de autenticação e autorização para permitir apenas o acesso de usuários autorizados. Autenticação JWT por exemplo.
4. Evite expor caminhos de arquivos absolutos ao cliente e trate possíveis erros, como arquivos não encontrados.

Incluir essas dicas de segurança em seu aplicativo pode ajudar a proteger seu sistema e seus usuários. Uma análise de segurança mais completa é sempre recomendada.

E assim finalizamos nossa implementação, qualquer duvida, sugestão ou crítica, deixe nos comentários. Obrigado pela leitura.
