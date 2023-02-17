import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimestampModule } from '../timestamp/timestamp.module';
import { Summary, SummarySchema } from './models/summary.model';
import { SummaryRepository } from './repositories/summary.repository';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Summary.name, schema: SummarySchema }
    ]),
    TimestampModule
  ],
  controllers: [SummaryController],
  providers: [SummaryService, SummaryRepository],
  exports: [SummaryService, SummaryRepository]
})
export class SummaryModule { }
