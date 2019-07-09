import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(cpf:string,password:string): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const checkUser = await this.usersService.checkUser(cpf,password);
    if(checkUser){
        const user: JwtPayload = { cpf: 'user@email.com' };
        return this.jwtService.sign(user);
    }
    else{
        return 'Not Authorized'
    }
   
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByCPF(payload.cpf);
  }
}