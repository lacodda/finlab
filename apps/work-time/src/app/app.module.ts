import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';
import { getMongoConfig } from './configs/mongo.config';
import { getRmqConfig } from './configs/rmq.config';
import { WorkTime, WorkTimeSchema } from './models/work-time.model';
import { WorkTimeRepository } from './repositories/work-time.repository';
import { WorkTimeController } from './work-time.controller';
import { WorkTimeService } from './work-time.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.work-time.env', isGlobal: true }),
    RMQModule.forRootAsync(getRmqConfig()),
    MongooseModule.forRootAsync(getMongoConfig()),
    MongooseModule.forFeature([
      { name: WorkTime.name, schema: WorkTimeSchema }
    ])
  ],
  controllers: [WorkTimeController],
  providers: [WorkTimeService, WorkTimeRepository],
  exports: [WorkTimeService, WorkTimeRepository]
})
export class AppModule {}
