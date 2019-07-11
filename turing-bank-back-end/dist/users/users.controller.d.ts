import { User as UserDocument } from '../users/interfaces/user.interface';
import { Request, Response } from 'express';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findAll(req: Request, res: Response): Promise<Response>;
    findUserByAccount(account: any): Promise<UserDocument>;
    update(user: UserDocument, updateUserDto: UpdateUserDto): Promise<UserDocument>;
}
