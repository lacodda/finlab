import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { getJwtConfig } from './configs/jwt.config';
import { getRmqConfig } from './configs/rmq.config';
// import { AuthController } from './controllers/auth.controller';
// import { UserController } from './controllers/user.controller';
// import { WorkTimeController } from './controllers/work-time.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { CatsModule } from './cats/cats.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
    RMQModule.forRootAsync(getRmqConfig()),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true
    })
  ],
  providers: [JwtStrategy]
  // controllers: [AppController],
  // providers: [AppService]
})
export class AppModule { }
