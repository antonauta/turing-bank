import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findAll(req: Request, res: Response): Promise<Response>;
    findOne(id: any): Promise<User>;
    create(createItemDto: CreateUserDto): Promise<User>;
    update(id: any, updateItemDto: CreateUserDto): string;
    delete(id: any): string;
}
