import { AuthService } from './auth.service';
import { UsersService } from './../../users/users.service';
import { Controller, Post, Body, Req } from '@nestjs/common';
import { LoginDTO,RegisterDTO } from './dto/auth.dto';
import {FastifyAdapter} from '@nestjs/platform-fastify'
import { FastifyRequest} from 'fastify'
import { Payload } from '../shared/payload';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';


@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

    constructor( private userService : UsersService,private authService : AuthService){}
    
    @ApiResponse({ status: 401, description: 'Senha invalida.'})
    @Post('login')
    async login(@Req() req : FastifyRequest,@Body() userDTO: LoginDTO) {
      const {ip} = req
      const user = await this.userService.findByLogin(userDTO);
      const payload: Payload = {
        _id:user._id,
        cpf: user.cpf,
        name:user.name,
        email:user.email,
        balance:user.balance,
        preferredName:user.preferredName,
        account:user.account,
        agency:user.agency
      };
      const token = await this.authService.signPayload(payload,ip);
      return { user, token };
    }
    
    
    @Post('register')
    async register(@Req() req : FastifyRequest,@Body() userDTO: RegisterDTO) {
      const user = await this.userService.create(userDTO);
      const {ip} = req;
      const payload: Payload = {
        _id:user._id,
        cpf: user.cpf,
        balance:user.balance,
        name:user.name,
        email:user.email,
        preferredName:user.preferredName,
        account:user.account,
        agency:user.agency
      };
      const token = await this.authService.signPayload(payload,ip);
      return { user, token };
    }


}
