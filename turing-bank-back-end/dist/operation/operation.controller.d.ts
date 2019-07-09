import { CreateOperationDto } from './dto/create.operation.dto';
import { OperationsService } from './operation.service';
import { Operation } from './interfaces/operation.interface';
export declare class OperationController {
    private readonly operationService;
    constructor(operationService: OperationsService);
    findOne(id: any): Promise<Operation>;
    create(createOperationDto: CreateOperationDto): Promise<Operation>;
}
