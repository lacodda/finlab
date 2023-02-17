import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';
import { getMongoConfig } from './configs/mongo.config';
import { getRmqConfig } from './configs/rmq.config';
import { TaskModule } from './task/task.module';
import { TimestampModule } from './timestamp/timestamp.module';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.work-time.env', isGlobal: true }),
    RMQModule.forRootAsync(getRmqConfig()),
    MongooseModule.forRootAsync(getMongoConfig()),
    SummaryModule,
    TaskModule,
    TimestampModule
  ]
})
export class AppModule { }
