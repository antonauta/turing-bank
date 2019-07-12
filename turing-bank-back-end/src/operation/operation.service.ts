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

  async findByClient( idClient: string, iDate: Date = new Date(), lDate: Date = new Date() ): Promise<Operation> {
    
    const currentDate = moment().format('dd/MM/YYYY');
    let initialDate = moment(iDate).format('dd/MM/YYYY');
    let lastDate = moment(lDate).format('dd/MM/YYYY')

    console.log("Data inicial " + initialDate)
    console.log("Data corrente " + currentDate)

    if (initialDate === currentDate) {
      initialDate = moment(iDate).subtract(7, 'days').toString()
      console.log("Data depois do moment " + initialDate)
      // initDate = new Date();
      // initDate.setDate(initDate.getDate() - 7)
    }

    const initDateISOFormat = moment(initialDate).toISOString();
    const lastDateISOFOrmat = moment(lastDate).toISOString();
    // const initDateISOFormat = initDate.toISOString()
    // const lastDateISOFOrmat = lastDate.toISOString()
    console.log("Data inicial ISO: " + initDateISOFormat)
    console.log("Data final ISO: " + lastDateISOFOrmat)

    return await this.operationModel.find({
      $or: [{ origin: idClient }, { destin: idClient }],
      "date": {
        "$gte": initDateISOFormat,
        "$lt": lastDateISOFOrmat
      }
    });
  }

  async create(createOperationDto: CreateOperationDto): Promise<Operation> {
    const newOperation = new this.operationModel(createOperationDto);

    let findUserDestination, findUserOrigin;
    switch (createOperationDto.type) {
      case 0:
        findUserDestination = await this.userService.findOne(
          createOperationDto.destination,
        );
        await this.userService.update(
          {
            _id: findUserDestination._id,
            balance: findUserDestination.balance + createOperationDto.value,
          },
          createOperationDto.destination,
        );

        break;
      case 1:
        const checkOriginBalance = await this.userService.findOne(
          createOperationDto.origin,
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
            _id: findUserDestination._id,
            balance: findUserDestination.balance + createOperationDto.value,
          },
          createOperationDto.destination,
        );
        findUserOrigin = await this.userService.findOne(
          createOperationDto.origin,
        );
        await this.userService.update(
          {
            _id: findUserOrigin._id,
            balance: findUserOrigin.balance - createOperationDto.value,
          },
          createOperationDto.origin,
        );
        break;
      case 2:
        let checkOriginBalanceWithDraw = await this.userService.findOne(
          createOperationDto.origin,
        );

        if (
          !checkOriginBalanceWithDraw ||
          checkOriginBalanceWithDraw.balance < createOperationDto.value
        ) {
          return new Promise((resolve, reject) =>
            reject({ error: 'Insuficient balance' }),
          );
        }
        findUserOrigin = await this.userService.findOne(
          createOperationDto.origin,
        );
        await this.userService.update(
          {
            _id: findUserOrigin._id,
            balance: findUserOrigin.balance - createOperationDto.value,
          },
          createOperationDto.origin,
        );
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
