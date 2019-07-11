import { UsersService } from './../../users/users.service';
import { Payload } from '../shared/payload';
export declare class AuthService {
    private userService;
    constructor(userService: UsersService);
    signPayload(payload: Payload): Promise<string>;
    validateUser(payload: Payload): Promise<any>;
}
