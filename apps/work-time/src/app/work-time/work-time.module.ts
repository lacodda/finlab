import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkTime, WorkTimeSchema } from './models/work-time.model';
import { WorkTimeRepository } from './repositories/work-time.repository';
import { WorkTimeController } from './work-time.controller';
import { WorkTimeService } from './work-time.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkTime.name, schema: WorkTimeSchema }
    ])
  ],
  controllers: [WorkTimeController],
  providers: [WorkTimeService, WorkTimeRepository],
  exports: [WorkTimeService, WorkTimeRepository]
})
export class WorkTimeModule { }
