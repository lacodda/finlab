import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { RMQModule } from 'nestjs-rmq';
import { getJwtConfig } from './configs/jwt.config';
import { getRmqConfig } from './configs/rmq.config';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { WorkTimeTimestampController } from './controllers/work-time/timestamp.controller';
import { WorkTimeTaskController } from './controllers/work-time/task.controller';
import { WorkTimeSummaryController } from './controllers/work-time/summary.controller';
import { WorkTimeCalendarController } from './controllers/work-time/calendar.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
    RMQModule.forRootAsync(getRmqConfig()),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule,
    ScheduleModule.forRoot()
  ],
  controllers: [
    AuthController,
    UserController,
    WorkTimeTimestampController,
    WorkTimeTaskController,
    WorkTimeSummaryController,
    WorkTimeCalendarController
  ],
  providers: [JwtStrategy]
})
export class AppModule {}
