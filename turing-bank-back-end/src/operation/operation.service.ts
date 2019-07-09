import { Injectable } from '@nestjs/common';
import { Operation } from './interfaces/operation.interface';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
@Injectable()
export class OperationsService {
    constructor(@InjectModel('Operation') private readonly operationModel: Model<Operation>) { }

    async findOneOperation(id: string): Promise<Operation> {
        return await this.operationModel.findOne({ _id: id });
    }

    async findAllOperation(): Promise<Operation[]> {
        return await this.operationModel.find();
    }
}




