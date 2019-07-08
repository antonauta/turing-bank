import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel:Model<User>){}
  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({_id:id});
  }
  async create(user:User){

    const newUser = new this.userModel(user)
    return await newUser.save()

  }
}
