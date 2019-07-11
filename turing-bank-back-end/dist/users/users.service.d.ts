import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { Payload } from '../infra/shared/payload';
import { LoginDTO, RegisterDTO } from 'src/infra/auth/dto/auth.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    sanitizeUser(user: User): User;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByAccount(account: string): Promise<User>;
    checkUser(cpf: string, password: string): Promise<User>;
    findByPayload(payload: Payload): Promise<any>;
    findByLogin(userDTO: LoginDTO): Promise<User>;
    create(userDTO: RegisterDTO): Promise<User>;
    update(user: User, id: string): Promise<User>;
    remove(id: String): Promise<User>;
}
