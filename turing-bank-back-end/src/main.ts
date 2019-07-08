import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as fs from 'fs';
import * as rfs from 'rotating-file-stream';
import * as path from 'path';
import * as morgan from 'morgan';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: morgan });
  app.setGlobalPrefix('/api/v1');
  // ensure log directory exists
  const logDirectory = path.join(__dirname, 'logs');
  
  if (fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)) {
    // create a rotating write stream
    console.log('ok')
    
    const accessLogStream = rfs.default('access.log', {interval: '1d',path: logDirectory,});
    // setup the logger
    morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':remote-addr - :remote-user [:date[clf]] :method :url :status :response-time ms - :res[content-length] :body - :req[content-length] ":referrer" ":user-agent"', { stream: accessLogStream }));
    
  }
  //MIDDLEWARES
  app.use(compression());
  app.use(helmet());
  app.enableCors();

  //SWAGGER SETUP
  const optionsUser = new DocumentBuilder()
    .setTitle('User endpoint API exemplos')
    .setBasePath('api/v1')
    .setDescription(
      'API para cadastro de usuarios,autenticao,criacao e regras de negocios que envolvam o usuario',
    )
    .setVersion('1.0')
    .addTag('users')
    .build();
  const documentUser = SwaggerModule.createDocument(app, optionsUser, {
    include: [UsersModule],
  });
  SwaggerModule.setup('docs/user', app, documentUser);

  const optionsTransactions = new DocumentBuilder()
    .setTitle('Transactions endpoint API exemplos')
    .setBasePath('api/v1')
    .setDescription(
      'API para cadastro de Transactions,,criacao e regras de negocios que envolvam as transacoes',
    )
    .setVersion('1.0')
    .addTag('transactions')
    .build();
  const documentTransactions = SwaggerModule.createDocument(
    app,
    optionsTransactions,
    { include: [TransactionsModule] },
  );
  SwaggerModule.setup('docs/transactions', app, documentTransactions);

  await app.listen(3000);
}
bootstrap();
