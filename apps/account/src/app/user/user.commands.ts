import { AccountAddApp, AccountUpdateProfile } from '@finlab/contracts';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserService } from './user.service';

@Controller()
export class UserCommands {
  constructor(private readonly userService: UserService) {}

  @RMQValidate()
  @RMQRoute(AccountUpdateProfile.topic)
  async updateProfile(@Body() { id, user }: AccountUpdateProfile.Request): Promise<AccountUpdateProfile.Response> {
    return await this.userService.updateProfile(user, id);
  }

  @RMQValidate()
  @RMQRoute(AccountAddApp.topic)
  async addApp(@Body() { userId, appId }: AccountAddApp.Request): Promise<AccountAddApp.Response> {
    return await this.userService.addApp(userId, appId);
  }
}
