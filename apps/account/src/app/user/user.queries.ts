import { AccountUserApps, AccountUserInfo } from '@finlab/contracts';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserRepository } from './repositories/user.repository';

@Controller()
export class UserQueries {
  constructor(private readonly userRepository: UserRepository) {}

  @RMQValidate()
  @RMQRoute(AccountUserInfo.topic)
  async userInfo(@Body() { id }: AccountUserInfo.Request): Promise<AccountUserInfo.Response> {
    return { user: await this.userRepository.findUserById(id) };
  }

  @RMQValidate()
  @RMQRoute(AccountUserApps.topic)
  async userApps(@Body() { id }: AccountUserApps.Request): Promise<AccountUserApps.Response> {
    const user = await this.userRepository.findUserById(id);
    return { apps: user.apps ?? [] };
  }
}
