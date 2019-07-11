import { AuthService } from './auth.service';
import { UsersService } from './../../users/users.service';
import { Controller, Post, Body } from '@nestjs/common';
import { LoginDTO,RegisterDTO } from './dto/auth.dto';
import { Payload } from '../shared/payload';

@Controller('auth')
export class AuthController {

    constructor(private userService : UsersService,private authService : AuthService){}


    @Post('login')
    async login(@Body() userDTO: LoginDTO) {
      const user = await this.userService.findByLogin(userDTO);
      const payload: Payload = {
        _id:user._id,
        cpf: user.cpf,
        name:user.name,
        email:user.email,
        preferredName:user.preferredName,
        account:user.account,
        agency:user.agency
      };
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }
  
    @Post('register')
    async register(@Body() userDTO: RegisterDTO) {
      const user = await this.userService.create(userDTO);
      const payload: Payload = {
        _id:user._id,
        cpf: user.cpf,
        name:user.name,
        email:user.email,
        preferredName:user.preferredName,
        account:user.account,
        agency:user.agency
      };
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }


}
