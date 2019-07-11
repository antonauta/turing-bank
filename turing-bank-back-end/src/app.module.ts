import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {MongooseModule} from '@nestjs/mongoose'
import { OperationModule } from './operation/operation.module';
import { AuthModule } from './infra/auth/auth.module';
import { SharedModule } from './infra/shared/shared.module';
import config from './config/keys';
import configProd from './config/keysprod'
@Module({
  imports: [UsersModule,MongooseModule.forRoot(process.env.NODE_ENV === 'PROD' ? configProd.mongoURI : config.mongoURI),OperationModule,AuthModule, SharedModule],

controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
