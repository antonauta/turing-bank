import { Injectable, Inject } from '@nestjs/common';
import { Operation } from './interfaces/operation.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOperationDto } from './dto/create.operation.dto';
import { UsersService } from '../users/users.service';
import { Moment } from 'moment';
import moment = require('moment');

@Injectable()
export class OperationsService {
  constructor(
    @InjectModel('Operation') private readonly operationModel: Model<Operation>,
    private userService: UsersService,
  ) {}

  // async findAll(): Promise<Operation[]> {
  //     return await this.operationModel.find();
  // }

  async findByClient( idClient: string, initDate : Date, lastDate : Date = new Date(Date.now()) ): Promise<any> {

    
    
    let dateFilter = {

    }
    if(initDate){
      const initDateISOFormat = new Date(initDate).toISOString()
      dateFilter = {
        "lt": initDateISOFormat
      }
    }
    if(lastDate){
      const lastDateISOFOrmat = new Date(lastDate).toISOString()
      dateFilter["$gte"] = lastDateISOFOrmat
    }
    const mainQuery = {
      $or: [{ origin: idClient }, { destination: idClient }],

    }
    if(Object.keys(dateFilter).length) mainQuery["date"] = dateFilter

    const currentExtract =  await this.operationModel.find(mainQuery).populate([{path:"destination",select:"-password"},{path:"origin",select:"-password"}]);
    const userBalance = await this.userService.findOne(idClient)
    return {
      operations: currentExtract,
      balance : userBalance.balance
    }
  }

  async create(userID:string,createOperationDto: CreateOperationDto): Promise<Operation> {
    let newOperation = new this.operationModel(createOperationDto);

    let findUserDestination, findUserOrigin;
    switch (createOperationDto.type) {
      case 0:
        findUserDestination = await this.userService.findOne(
          userID
        );
        await this.userService.update(
          {
           
            balance: findUserDestination.balance + createOperationDto.value,
          },
          userID
        );
          newOperation = new this.operationModel({...createOperationDto,destination:userID});
        break;
      case 1:
        const checkOriginBalance = await this.userService.findOne(
         userID
        );

        if (
          !checkOriginBalance ||
          checkOriginBalance.balance < createOperationDto.value
        ) {
          return new Promise((resolve, reject) =>
            reject({ error: 'Insuficient balance' }),
          );
        }
        findUserDestination = await this.userService.findOne(
          createOperationDto.destination,
        );
        await this.userService.update(
          {
         
            balance: findUserDestination.balance + createOperationDto.value,
          },
          createOperationDto.destination,
        );
        findUserOrigin = await this.userService.findOne(
         userID
        );
        await this.userService.update(
          {
          
            balance: findUserOrigin.balance - createOperationDto.value,
          },
          userID
        );
        newOperation = new this.operationModel({...createOperationDto,origin:userID,destination:createOperationDto.destination});
        break;
      default:
        return new Promise((resolve, reject) =>
          reject({ error: 'Invalid Operation' }),
        );
    }
    console.log(newOperation)
    return await newOperation.save();
  }
}
