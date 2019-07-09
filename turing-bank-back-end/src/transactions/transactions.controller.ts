import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Req,
    Res,
    Param
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateTransactionDto } from './dto/create.transaction.dto';

@Controller('transactions')
export class TransactionsController { }
