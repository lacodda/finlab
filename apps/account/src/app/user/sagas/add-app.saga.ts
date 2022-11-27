import { AppStatus } from '@finlab/interfaces';
import { RMQService } from 'nestjs-rmq';
import { UserEntity } from '../entities/user.entity';
import { AddAppSagaState } from './add-app.state';
import { AddAppSagaStateActivated } from './add-app.steps';

export class AddAppSaga {
  private state: AddAppSagaState;

  constructor(public readonly user: UserEntity, public readonly appId: string, public readonly rmqService: RMQService) {}
  setStatus(status: AppStatus): void {
    switch (status) {
      case AppStatus.Inactive:
        this.state = new AddAppSagaStateActivated();
        break;
      case AppStatus.Active:
        break;
      case AppStatus.Deleted:
        break;
    }
    this.state.setContext(this);
    this.user.updateAppStatus(this.appId, status);
  }

  getStatus(): AddAppSagaState {
    return this.state;
  }
}
