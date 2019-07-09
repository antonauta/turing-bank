import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Req,
    Res,
    Param,
} from '@nestjs/common';
import { CreateOperationDto } from './dto/create.operation.dto';
import { OperationsService } from './operation.service';
import { Operation } from './interfaces/operation.interface';

@Controller('operation')
export class OperationController { 
    constructor(private readonly operationService: OperationsService) {}

    // @Get()
    // async findAll(@Req() req: Request, @Res() res: Response): Promise<Response> {
    //     const operations = await this.operationService.findAll();
    //     return res.json();
    // }

    @Get(':id')
    async findOne(@Param('id') id): Promise<Operation> {
        return this.operationService.findByClient(id);
    }

    @Post()
    async create(@Body() createOperationDto: CreateOperationDto): Promise<Operation> {
        return this.operationService.create(createOperationDto);
    }
}
