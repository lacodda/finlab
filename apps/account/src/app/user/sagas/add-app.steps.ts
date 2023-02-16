import { AppGetApp } from '@finlab/contracts';
import { AppStatus } from '@finlab/interfaces';
import { type UserEntity } from '../entities/user.entity';
import { AddAppSagaState } from './add-app.state';

export class AddAppSagaStateInactive extends AddAppSagaState {
  public async activate(): Promise<{ user: UserEntity }> {
    const { app } = await this.saga.rmqService.send<AppGetApp.Request, AppGetApp.Response>(AppGetApp.topic, { id: this.saga.appId });
    if (!app) {
      throw new Error('This application does not exist');
    }
    this.saga.setStatus(AppStatus.Active);
    return { user: this.saga.user };
  }

  public async deactivate(): Promise<{ user: UserEntity }> {
    throw new Error('Unable to deactivate an inactive application!');
  }

  public async delete(): Promise<{ user: UserEntity }> {
    const { app } = await this.saga.rmqService.send<AppGetApp.Request, AppGetApp.Response>(AppGetApp.topic, { id: this.saga.appId });
    if (!app) {
      throw new Error('This application does not exist');
    }
    this.saga.setStatus(AppStatus.Deleted);
    return { user: this.saga.user };
  }
}

export class AddAppSagaStateActive extends AddAppSagaState {
  public async activate(): Promise<{ user: UserEntity }> {
    throw new Error('Unable to activate an active application!');
  }

  public async deactivate(): Promise<{ user: UserEntity }> {
    const { app } = await this.saga.rmqService.send<AppGetApp.Request, AppGetApp.Response>(AppGetApp.topic, { id: this.saga.appId });
    if (!app) {
      throw new Error('This application does not exist');
    }
    this.saga.setStatus(AppStatus.Inactive);
    return { user: this.saga.user };
  }

  public async delete(): Promise<{ user: UserEntity }> {
    const { app } = await this.saga.rmqService.send<AppGetApp.Request, AppGetApp.Response>(AppGetApp.topic, { id: this.saga.appId });
    if (!app) {
      throw new Error('This application does not exist');
    }
    this.saga.setStatus(AppStatus.Deleted);
    return { user: this.saga.user };
  }
}

export class AddAppSagaStateDeleted extends AddAppSagaState {
  public async activate(): Promise<{ user: UserEntity }> {
    const { app } = await this.saga.rmqService.send<AppGetApp.Request, AppGetApp.Response>(AppGetApp.topic, { id: this.saga.appId });
    if (!app) {
      throw new Error('This application does not exist');
    }
    this.saga.setStatus(AppStatus.Active);
    return { user: this.saga.user };
  }

  public async deactivate(): Promise<{ user: UserEntity }> {
    throw new Error('Unable to deactivate an deleted application!');
  }

  public async delete(): Promise<{ user: UserEntity }> {
    throw new Error('Unable to delete an deleted application!');
  }
}
