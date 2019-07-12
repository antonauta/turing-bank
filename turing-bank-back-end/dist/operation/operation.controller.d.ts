import { User as UserDocument } from '../users/interfaces/user.interface';
import { CreateOperationDto } from './dto/create.operation.dto';
import { OperationsService } from './operation.service';
import { Operation } from './interfaces/operation.interface';
export declare class OperationController {
    private readonly operationService;
    constructor(operationService: OperationsService);
    find(user: UserDocument, queryDate: any): Promise<any>;
    create(user: UserDocument, createOperationDto: CreateOperationDto): Promise<Operation>;
}
