import { AuthGuard } from '@nestjs/passport';
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
  UseGuards,
} from '@nestjs/common';
import { User as UserDocument } from '../users/interfaces/user.interface';
import { User } from '../infra/shared/user.decorator';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';
import { ApiImplicitParam, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';


@ApiUseTags('main')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response): Promise<Response> {
     const query = req.query
    const users = await this.userService.findAll();
    console.log(users)
    return res.json(users);
  }
  @ApiImplicitParam({name:'account'})	
  @Get('/account/:account')
  @UseGuards(AuthGuard('jwt'))
  async findUserByAccount(@Param('account') account){
    return await this.userService.findByAccount(account)
  }
 
  @Put('user')
  @UseGuards(AuthGuard('jwt'))
  async update(@User() user: UserDocument, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(updateUserDto, user._id);
  }
 
}
