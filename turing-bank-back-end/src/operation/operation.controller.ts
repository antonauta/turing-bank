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
    Query,
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
    async find(@Param('id') id, @Query() queryDate): Promise<Operation> {
        return this.operationService.findByClient(id, queryDate.initDate, queryDate.lastDate);
    }

    @Post()
    async create(@Body() createOperationDto: CreateOperationDto): Promise<Operation> {
        return this.operationService.create(createOperationDto);
    }
}
