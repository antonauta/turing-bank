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
import { Request, Response } from 'express';
import { CreateOperationDto } from './dto/create.operation.dto';
import { OperationsService } from './operation.service';
import { Operation } from './interfaces/operation.interface';
import { get } from 'https';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('operation')
export class OperationController { 
    constructor(private readonly operationService: OperationsService) {}

    @Get()
    async findAll(@Req() req: Request, @Res() res: Response): Promise<Response> {
        const operations = await this.operationService.findAll();
        return res.json();
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<Operation> {
        return this.operationService.findOne(id);
    }

    @Post()
    async create(@Body() createOperationDto: CreateOperationDto): Promise<Operation> {
        return this.operationService.create(createOperationDto);
    }
}
