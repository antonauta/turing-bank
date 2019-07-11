import { Operation } from './interfaces/operation.interface';
import { Model } from 'mongoose';
import { CreateOperationDto } from './dto/create.operation.dto';
import { UsersService } from '../users/users.service';
export declare class OperationsService {
    private readonly operationModel;
    private userService;
    constructor(operationModel: Model<Operation>, userService: UsersService);
    findByClient(idClient: string, initDate: Date, lastDate?: Date): Promise<any>;
    create(userID: string, createOperationDto: CreateOperationDto): Promise<Operation>;
}
