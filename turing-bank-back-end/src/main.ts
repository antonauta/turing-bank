import { AuthModule } from './infra/auth/auth.module';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as compression from 'compression'
import * as fastifycompress from 'fastify-compress'
import * as helmet from 'fastify-helmet'
import * as cors from 'fastify-cors'
import {
  FastifyAdapter,
  
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { UsersModule } from './users/users.module';
import { OperationModule } from './operation/operation.module'
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  
  app.setGlobalPrefix("/api/v1");

  //compression
    app.register( fastifycompress,
    { inflateIfDeflated: true })
  //MIDDLEWARES
 
  app.register(
    helmet,
    // Example of passing an option to x-powered-by middleware
    { hidePoweredBy: { setTo: 'COBOL 4.2.0' } }
  )

  app.register(
    cors
  )
  // app.enableCors();

  
  
  //SWAGGER SETUP
  if(process.env.AZUREMODE!=='yes'){
    const optionsUser = new DocumentBuilder()
    .setTitle('Endpoint da API com exemplos')
    .setBasePath('api/v1')
    .setDescription('API para cadastro de usuarios,autenticao,criacao e regras de negocios que envolvam o usuario e operacoes')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('main')
    .build();
  const documentUser = SwaggerModule.createDocument(app, optionsUser, { include: [UsersModule,OperationModule,AuthModule] });
  SwaggerModule.setup('docs/swagger', app, documentUser);
  }
  

  // const optionsOperations = new DocumentBuilder()
  //   .setTitle('Operations endpoint API exemplos')
  //   .setBasePath('api/v1')
  //   .setDescription('API para cadastro de Operações,criacao e regras de negocios que envolvam as transacoes')
  //   .setVersion('1.0')
  //   .addTag('operations')
  //   .build();
  // const documentTransactions = SwaggerModule.createDocument(app, optionsOperations, { include: [OperationModule] });
  // SwaggerModule.setup('docs/operations', app, documentTransactions);

  //auth
  



  await app.listen(process.env.PORT || 3000,'0.0.0.0');
}
bootstrap();
