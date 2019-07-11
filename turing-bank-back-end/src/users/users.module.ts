import { HttpExceptionFilter } from './../infra/shared/http-exception.filter';
import { Module } from '@nestjs/common';
import {UsersController} from './users.controller'
import { UsersService } from './users.service';

import {MongooseModule} from '@nestjs/mongoose'
import { UserSchema } from './schemas/user.schema';
import { APP_FILTER } from '@nestjs/core';
@Module({
    imports : [MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
  
controllers: [UsersController],
    providers: [UsersService, {
        provide: APP_FILTER,
        useClass: HttpExceptionFilter,
      }],
    exports: [UsersService]
})
export class UsersModule {}
