import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {MongooseModule} from '@nestjs/mongoose'
import { TransactionsModule } from './transactions/transactions.module';
import { ExtractModule } from './extract/extract.module';
import { OperationModule } from './operation/operation.module';
import config from './config/keys';
import configProd from './config/keysprod'
@Module({
  imports: [UsersModule,MongooseModule.forRoot(process.env.NODE_ENV === 'PROD' ? config.mongoURI : configProd.mongoURI), TransactionsModule, ExtractModule, OperationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
