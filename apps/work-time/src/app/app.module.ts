import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WorkTimeController } from './work-time.controller';
import { WorkTimeService } from './work-time.service';
import { WorkTime, WorkTimeSchema } from './work-time.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkTime.name, schema: WorkTimeSchema }
    ])
  ],
  controllers: [WorkTimeController],
  providers: [WorkTimeService],
  exports: [WorkTimeService]
})
export class AppModule {}
