import { Test } from '@nestjs/testing';
import { mockgooseProvider } from '../../test/mockoose.provider';
import { UserSchema } from './schemas/user.schema';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { async } from 'rxjs/internal/scheduler/async';
import { UsersController } from './users.controller';

describe('UserService', async () => {
  let userService: UsersService;
  let userModel: Model<User>
  const token = getModelToken(UserSchema);
  const userProvider = {
    provide: token,
    useFactory: async connection => connection.model('User', UserSchema),
    inject: ['DbConnectionToken'],
  } as any;

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    const module = await Test.createTestingModule({
      controllers: [UsersController]
    }).compile();
    userService = module.get<UsersService>(UsersService);
    userModel = module.get(token);
  });


});
