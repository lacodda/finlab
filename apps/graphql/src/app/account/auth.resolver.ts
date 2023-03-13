import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RMQService } from 'nestjs-rmq';
import { AccountLoginRequest, AccountLoginResponse, AccountLoginTopic, AccountRegisterRequest, AccountRegisterResponse, AccountRegisterTopic, User } from '@finlab/contracts';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly rmqService: RMQService) { }

  @Mutation(() => AccountRegisterResponse)
  async register(@Args('request') dto: AccountRegisterRequest): Promise<AccountRegisterResponse | undefined> {
    try {
      return await this.rmqService.send<AccountRegisterRequest, AccountRegisterResponse>(AccountRegisterTopic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Mutation(() => AccountLoginResponse)
  async login(@Args('request') dto: AccountLoginRequest): Promise<AccountLoginResponse | undefined> {
    try {
      return await this.rmqService.send<AccountLoginRequest, AccountLoginResponse>(AccountLoginTopic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
