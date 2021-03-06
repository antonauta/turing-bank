import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
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
  ) { }

  // async findAll(): Promise<Operation[]> {
  //     return await this.operationModel.find();
  // }

  async findByClient(idClient: string, initDate: Date, lastDate: Date,page:number=1): Promise<any> {
    let dateFilter = {}
    let currentDate = new Date();
    let lastingDate = new Date();

    lastingDate.setDate(lastingDate.getDate() - 7);
    dateFilter["$gte"] = lastingDate;
    dateFilter["$lte"] = currentDate; 
    
    if (initDate) {
      const initDateISOFormat = new Date(initDate).toISOString()
      dateFilter = {
        "$lte": initDateISOFormat
      }
    }
    if (lastDate) {
      const lastDateISOFOrmat = new Date(lastDate).toISOString()
      dateFilter["$gte"] = lastDateISOFOrmat
    }

    const mainQuery = {
      $or: [{ origin: idClient }, { destination: idClient }],

    }
    mainQuery["date"] = dateFilter
    console.log(mainQuery);
   //  const currentExtract = await this.operationModel.find(mainQuery).populate([{ path: "destination", select: "-password" }, { path: "origin", select: "-password" }]);
    const currentExtract = await this.operationModel.paginate(mainQuery,{
      page,
      populate:['origin','destination'],
      lean:true,
      limit:20

    })
    const userBalance = await this.userService.findOne(idClient)
    return {
       operations: currentExtract.docs,
      pagination:{
        currentPage:currentExtract.page,
        totalPages:currentExtract.totalPages,
        nextPage :currentExtract.nextPage,
        totalDocs:currentExtract.totalDocs
      },
      balance: userBalance.balance
    }
  }

  async create(userID: string, createOperationDto: CreateOperationDto): Promise<Operation> {
    let newOperation = new this.operationModel(createOperationDto);

    let findUserDestination, findUserOrigin,originNewBalance,destinationNewBalance;
    const checkOriginBalance = await this.userService.findOne(
      userID
    );
        console.log(userID)
    if (
      (createOperationDto.destination!==userID)&&(!checkOriginBalance ||
      checkOriginBalance.balance < createOperationDto.value)
    ) {
       throw new HttpException('User out of balance', HttpStatus.BAD_REQUEST);
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
    destinationNewBalance = findUserDestination.balance + createOperationDto.value;
    
    if((createOperationDto.destination!==userID)){
      findUserOrigin = await this.userService.findOne(
        userID
      );
      await this.userService.update(
        {
  
          balance: findUserOrigin.balance - createOperationDto.value,
        },
        userID
      );
      originNewBalance = findUserOrigin.balance - createOperationDto.value;
    }
   
    newOperation = new this.operationModel({ ...createOperationDto, origin: userID, destination: createOperationDto.destination,destination_balance:destinationNewBalance,origin_balance:originNewBalance });
    
    console.log(newOperation)
    return await newOperation.save();
  }
}
