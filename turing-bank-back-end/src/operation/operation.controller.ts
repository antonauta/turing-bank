import { ApiBearerAuth, ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';
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
    UseGuards,
} from '@nestjs/common';
import { User as UserDocument } from '../users/interfaces/user.interface';
import { User } from '../infra/shared/user.decorator';
import { CreateOperationDto } from './dto/create.operation.dto';
import { OperationsService } from './operation.service';
import { Operation } from './interfaces/operation.interface';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('main')
@ApiBearerAuth()
@Controller('operation')
export class OperationController { 
    constructor(private readonly operationService: OperationsService) {}
   
    @Get('by_user')
    @UseGuards(AuthGuard('jwt'))
    // @ApiImplicitParam({name:'initDate'})
    // @ApiImplicitParam({name:'lastDate'})
    async find(@User() user: UserDocument, @Query() query) {
        const {_id} = user;
        const {page} = query;
        console.log(page)
        return await this.operationService.findByClient(_id, query.initDate, query.lastDate,page);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@User() user: UserDocument, @Body() createOperationDto: CreateOperationDto){
        return await this.operationService.create(user._id,createOperationDto);
    }
}
