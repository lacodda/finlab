import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Timestamp, TimestampSchema } from './models/timestamp.model';
import { TimestampRepository } from './repositories/timestamp.repository';
import { TimestampController } from './timestamp.controller';
import { TimestampService } from './timestamp.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Timestamp.name, schema: TimestampSchema }
    ])
  ],
  controllers: [TimestampController],
  providers: [TimestampService, TimestampRepository],
  exports: [TimestampService, TimestampRepository]
})
export class TimestampModule { }
