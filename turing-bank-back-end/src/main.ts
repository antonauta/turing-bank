import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as compression from 'compression'
import * as helmet from 'helmet'
import { UsersModule } from './users/users.module';
import { OperationModule } from './operation/operation.module'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1");

  //MIDDLEWARES
  app.use(compression());
  app.use(helmet())
  app.enableCors();

  //SWAGGER SETUP
  const optionsUser = new DocumentBuilder()
    .setTitle('User endpoint API exemplos')
    .setBasePath('api/v1')
    .setDescription('API para cadastro de usuarios,autenticao,criacao e regras de negocios que envolvam o usuario')
    .setVersion('1.0')
    .addBearerAuth('header')
    .addTag('users')
    .build();
  const documentUser = SwaggerModule.createDocument(app, optionsUser, { include: [UsersModule] });
  SwaggerModule.setup('docs/user', app, documentUser);

  const optionsOperations = new DocumentBuilder()
    .setTitle('Operations endpoint API exemplos')
    .setBasePath('api/v1')
    .setDescription('API para cadastro de Operações,criacao e regras de negocios que envolvam as transacoes')
    .setVersion('1.0')
    .addTag('operations')
    .build();
  const documentTransactions = SwaggerModule.createDocument(app, optionsOperations, { include: [OperationModule] });
  SwaggerModule.setup('docs/operations', app, documentTransactions);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
