import { AppStatus } from '@finlab/interfaces';
import { type RMQService } from 'nestjs-rmq';
import { type UserEntity } from '../entities/user.entity';
import { type AddAppSagaState } from './add-app.state';
import { AddAppSagaStateActive, AddAppSagaStateDeleted, AddAppSagaStateInactive } from './add-app.steps';

export class AddAppSaga {
  private state: AddAppSagaState;

  constructor(
    public readonly user: UserEntity,
    public readonly appId: string,
    public readonly rmqService: RMQService) {
    this.setStatus(user.getAppStatus(appId));
  }

  setStatus(status: AppStatus): void {
    switch (status) {
      case AppStatus.Inactive:
        this.state = new AddAppSagaStateInactive();
        break;
      case AppStatus.Active:
        this.state = new AddAppSagaStateActive();
        break;
      case AppStatus.Deleted:
        this.state = new AddAppSagaStateDeleted();
        break;
    }
    this.state.setContext(this);
    this.user.setAppStatus(this.appId, status);
  }

  getStatus(): AddAppSagaState {
    return this.state;
  }
}
