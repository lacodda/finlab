import { AppStatus } from '@finlab/interfaces';
import { RMQService } from 'nestjs-rmq';
import { UserEntity } from '../entities/user.entity';
import { AddAppSagaState } from './add-app.state';

export class AddAppSaga {
  private readonly state: AddAppSagaState;

  constructor(private readonly user: UserEntity, private readonly appId: string, private readonly rmqService: RMQService) {}
  setStatus(status: AppStatus): void {
    switch (status) {
      case AppStatus.Inactive:
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
