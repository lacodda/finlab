import { type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { getJwtConfig } from './configs/jwt.config';
import { getRmqConfig } from './configs/rmq.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { WorkTimeModule } from './work-time/work-time.module';
import { AccountModule } from './account/account.module';
import { DateScalar } from './common/scalars/date.scalar';
import { getGraphQLConfig } from './configs/graphql.config';
import { PubSubModule } from './configs/pub-sub.config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.graphql.env', isGlobal: true }),
    RMQModule.forRootAsync(getRmqConfig()),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule,
    GraphQLModule.forRoot<ApolloDriverConfig>(getGraphQLConfig()),
    PubSubModule,
    AccountModule,
    WorkTimeModule
  ],
  providers: [JwtStrategy, DateScalar]
})
export class AppModule { }
