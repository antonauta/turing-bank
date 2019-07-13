import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import {Model} from 'mongoose'
import {Payload} from '../infra/shared/payload'
import * as  bcrypt from 'bcrypt';
import {InjectModel} from '@nestjs/mongoose'
import { LoginDTO, RegisterDTO } from 'src/infra/auth/dto/auth.dto';
const SALT_WORK_FACTOR = 10;
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private  userModel:Model<User>){}

  sanitizeUser(user: User) {
    
    const sanitized = user;
    delete sanitized['password'];
    return sanitized;
    // return user.depopulate('password');
  }
  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({_id:id});
  }
  async findByAccount(account:string) : Promise<User>{
    return await this.userModel.findOne({account:{$eq:account}})
  }
  async checkUser(cpf:string,password:string) : Promise<User>{
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    const encryptedpwd = await bcrypt.hash(password, salt)

    return await this.userModel.findOne({cpf,password:encryptedpwd})
  }

  async findByPayload(payload: Payload) {
    const { cpf } = payload;
    return await this.userModel.findOne({ cpf });
  }

  async findByLogin(userDTO: LoginDTO) {
    const { cpf, password } = userDTO;
    const user = await this.userModel
      .findOne({ cpf })
      .select('cpf password agency account preferredName name balance');
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }


  async create(userDTO: RegisterDTO) {
    const { cpf } = userDTO;
    const user = await this.userModel.findOne({ cpf });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async update(user:User,id:string):Promise<User>{
      return await this.userModel.findOneAndUpdate({_id:id},user)
  }
  async remove(id:String):Promise<User>{
      return await this.userModel.findByIdAndRemove(id)
  }

}
