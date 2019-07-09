import { Injectable } from '@nestjs/common';
import { Operation } from './interfaces/operation.interface';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateOperationDto } from './dto/create.operation.dto';
@Injectable()
export class OperationsService {
    constructor(@InjectModel('Operations') private readonly operationModel: Model<Operation>) { }

    async findAll(): Promise<Operation[]> {
        return await this.operationModel.find();
    }
    async findOne(id: string): Promise<Operation> {
        return await this.operationModel.findOne({ _id: id });
    }
    async create(createOperationDto: CreateOperationDto): Promise<Operation> {
        const newOperation = new this.operationModel(createOperationDto)
        return await newOperation.save()
    }
}
