import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import {Model} from 'mongoose'
import * as  bcrypt from 'bcryptjs';
import {InjectModel} from '@nestjs/mongoose'
const SALT_WORK_FACTOR = 10;
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel:Model<User>){}
  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({_id:id});
  }
  async checkUser(cpf:string,password:string) : Promise<User>{
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    const encryptedpwd = await bcrypt.hash(password, salt)

    return await this.userModel.findOne({cpf,password:encryptedpwd})
  }

  async findOneByCPF(cpf:string) : Promise<User>{
    
    return await this.userModel.findOne({cpf})
  }

  async findOneByEmail(email:string) : Promise<User>{
    return await this.userModel.findOne({email})
  }

  async findOneByToken(token:string) : Promise<User>{
    return await this.userModel.findOne({token})
  }




  async create(user:User):Promise<User>{

    const newUser = new this.userModel(user)
    return await newUser.save()

  }
  async update(user:User,id:string):Promise<User>{
      return await this.userModel.findOneAndUpdate({_id:id},user)
  }
  async remove(id:String):Promise<User>{
      return await this.userModel.findByIdAndRemove(id)
  }

}
