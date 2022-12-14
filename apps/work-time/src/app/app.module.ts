import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';
import { getMongoConfig } from './configs/mongo.config';
import { getRmqConfig } from './configs/rmq.config';
import { TaskModule } from './task/task.module';
import { WorkTimeModule } from './work-time/work-time.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.work-time.env', isGlobal: true }),
    RMQModule.forRootAsync(getRmqConfig()),
    MongooseModule.forRootAsync(getMongoConfig()),
    WorkTimeModule,
    TaskModule
  ]
})
export class AppModule { }
