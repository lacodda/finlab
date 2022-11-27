import { AppGetApp } from '@finlab/contracts';
import { AppStatus } from '@finlab/interfaces';
import { UserEntity } from '../entities/user.entity';
import { AddAppSagaState } from './add-app.state';

export class AddAppSagaStateActivated extends AddAppSagaState {
  public async activate(): Promise<{ link: string, user: UserEntity }> {
    const { app } = await this.saga.rmqService.send<AppGetApp.Request, AppGetApp.Response>(AppGetApp.topic, { id: this.saga.appId });
    if (!app) {
      throw new Error('This application does not exist');
    }
    this.saga.setStatus(AppStatus.Active);
    return { link: '', user: this.saga.user };
  }

  public async deactivate(): Promise<{ user: UserEntity }> {
    throw new Error('Unable to deactivate an inactive application!');
  }

  public async delete(): Promise<{ user: UserEntity }> {
    throw new Error('Unable to delete an inactive application!');
  }
}
