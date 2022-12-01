import { AccountAddApp, AccountUpdateProfile } from '@finlab/contracts';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQService, RMQValidate } from 'nestjs-rmq';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { AddAppSaga } from './sagas/add-app.saga';

@Controller()
export class UserCommands {
  constructor(private readonly userRepository: UserRepository, private readonly rmqService: RMQService) {}

  @RMQValidate()
  @RMQRoute(AccountUpdateProfile.topic)
  async userInfo(@Body() { id, user }: AccountUpdateProfile.Request): Promise<AccountUpdateProfile.Response> {
    const existedUser = await this.userRepository.findUserById(id);
    if (!existedUser) {
      throw new Error('This user does not exist!');
    }

    const userEntity = new UserEntity(existedUser).updateProfile(user.displayName);
    await this.userRepository.updateUser(userEntity);
    return { user: userEntity };
  }

  @RMQValidate()
  @RMQRoute(AccountAddApp.topic)
  async addApp(@Body() { userId, appId }: AccountAddApp.Request): Promise<AccountAddApp.Response> {
    const existedUser = await this.userRepository.findUserById(userId);
    if (!existedUser) {
      throw new Error('This user does not exist!');
    }

    const userEntity = new UserEntity(existedUser);
    const saga = new AddAppSaga(userEntity, appId, this.rmqService);
    const { user } = await saga.getStatus().activate();
    await this.userRepository.updateUser(user);
    return { apps: user.apps };
  }
}
