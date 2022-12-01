import { Injectable } from '@nestjs/common';
import { AccountAddApp, AccountUpdateProfile } from '@finlab/contracts';
import { RMQService } from 'nestjs-rmq';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { AddAppSaga } from './sagas/add-app.saga';
import { IUser } from '@finlab/interfaces';
import { UserEventEmitter } from './user.event-emitter';
import { UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rmqService: RMQService,
    private readonly userEventEmitter: UserEventEmitter
  ) {}

  public async updateProfile(user: Pick<IUser, 'displayName'>, id: string): Promise<AccountUpdateProfile.Response> {
    const existedUser = await this.userRepository.findUserById(id);
    if (!existedUser) {
      throw new Error('This user does not exist!');
    }

    const userEntity = new UserEntity(existedUser).updateProfile(user.displayName);
    await this.updateUser(userEntity);
    return { user: userEntity };
  }

  public async addApp(userId: string, appId: string): Promise<AccountAddApp.Response> {
    const existedUser = await this.userRepository.findUserById(userId);
    if (!existedUser) {
      throw new Error('This user does not exist!');
    }

    const userEntity = new UserEntity(existedUser);
    const saga = new AddAppSaga(userEntity, appId, this.rmqService);
    const { user } = await saga.getStatus().activate();
    await this.updateUser(userEntity);
    return { apps: user.apps };
  }

  private async updateUser(user: UserEntity): Promise<[unknown, UpdateWriteOpResult]> {
    return await Promise.all(
      [
        this.userEventEmitter.handle(user),
        this.userRepository.updateUser(user)
      ]
    );
  }
}
