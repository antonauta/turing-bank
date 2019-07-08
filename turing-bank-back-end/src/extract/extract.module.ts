import { Module } from '@nestjs/common';
import { ExtractController } from './extract.controller';

@Module({
  controllers: [ExtractController]
})
export class ExtractModule {}
