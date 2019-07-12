import { UsersService } from './../../users/users.service';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { Payload } from '../shared/payload'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY || 'abubakacar', { expiresIn: '12h' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}