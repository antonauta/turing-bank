import { Injectable } from '@nestjs/common';
import { Statement } from './interfaces/statement.interface';
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import { CreateStatementDto } from './dto/create.statement.dto'


@Injectable()
export class StatementService {
 constructor(
  @InjectModel('Statement') private readonly statementModel: Model<Statement>
 ){}


  async createStetement(createStatementDto: CreateStatementDto): Promise<Statement> {

    const newStatement = new this.statementModel(createStatementDto)
    return await newStatement.save()
  }

  async findByClient(idClient: string): Promise<Statement[]> {
    return await this.statementModel.find({
      $or: [{ origin: idClient }, { destin: idClient }],
    })
  }

  async findByDate(idClient: string, initDate: Date, finalDate?: Date): Promise<Statement[]> {
    
    if(!finalDate) {
      finalDate = new Date();
    }  
    

    let stringInitDate = new Date(initDate.toISOString())

    return await this.statementModel.find({
      "date": {
          "$gte": new Date(initDate),
          "$lt": new Date(finalDate)
      }
    })
  }
}


