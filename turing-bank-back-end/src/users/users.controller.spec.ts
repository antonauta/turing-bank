import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  const user: User = {
    id: 'string',
    name: 'string',
    account : 123456789,
    preferredName: 'string',
    agency : 'string',
    email : 'string',
    cpf : 'string',
    balance : 0,
    password : 'string',
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return an array of users',  () => {
      const result: User[] = [user];
      const promise: Promise<User[]> = Promise.resolve(() => {}).then(() => result);

      jest.spyOn(service, 'findAll').mockImplementation( async () => promise);
      expect(controller.findOne('id')).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an user',  () => {
      const result: User = user;
      const promise: Promise<User> = Promise.resolve(() => {}).then(() => result);

      jest.spyOn(service, 'findOne').mockImplementation( async () => promise);
      expect(controller.findOne(user.id)).toBe(result);
    });
  });


  describe('findOne', () => {
    it('should return an user',  () => {
      const result: User = user;
      const promise: Promise<User> = Promise.resolve(() => {}).then(() => result);

      jest.spyOn(service, 'findOne').mockImplementation( async () => promise);
      expect(controller.findOne(user.id)).toBe(result);
    });
  });



});