import { Controller, Get, Param } from '@nestjs/common';
import { StatementService } from './statement.service';
import { Statement } from './interfaces/statement.interface';
import { identity } from 'rxjs';

@Controller('statement')
export class StatementController {
  constructor(private readonly statementService: StatementService) {}
  
  @Get(':id')
  async findByClient(@Param('id') id): Promise<Statement[]> {
    return this.statementService.findByClient(id);
  }

  @Get(':id/:initDate/:lastDate' )
  async findByDate(@Param('id') id, @Param('initDate') initDate, @Param('lastDate') lastDate){
    return this.statementService.findByDate(id, initDate, lastDate);
  }
}

