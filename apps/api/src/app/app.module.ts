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
import { WorkTimeController } from './controllers/work-time.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
    RMQModule.forRootAsync(getRmqConfig()),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AuthController, UserController, WorkTimeController],
  providers: [JwtStrategy]
})
export class AppModule {}
