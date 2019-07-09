import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findOneByCPF(cpf: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    findOneByToken(token: string): Promise<User>;
    create(user: User): Promise<User>;
    update(user: User, id: string): Promise<User>;
    remove(id: String): Promise<User>;
}
