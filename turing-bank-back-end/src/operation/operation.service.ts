import { Injectable, Inject } from '@nestjs/common';
import { Operation } from './interfaces/operation.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOperationDto } from './dto/create.operation.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class OperationsService {
  constructor(
    @InjectModel('Operation') private readonly operationModel: Model<Operation>,
    private userService: UsersService,
  ) {}

  // async findAll(): Promise<Operation[]> {
  //     return await this.operationModel.find();
  // }
  async findByClient(idClient: string): Promise<Operation> {
    return await this.operationModel.find({
      $or: [{ origin: idClient }, { destin: idClient }],
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
    return await newOperation.save();
  }
}
