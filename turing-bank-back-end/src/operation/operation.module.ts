import { Module } from '@nestjs/common';
import { OperationController } from './operation.controller';
import {MongooseModule} from '@nestjs/mongoose'
import {OperationsService} from './operation.service'
import {operationSchema} from './schema/operation.schema'
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
@Module({
  imports : [MongooseModule.forFeature([{name:'Operation',schema:operationSchema}]),UsersModule],
  


  controllers: [OperationController],
      providers: [OperationsService]

})
export class OperationModule {}
