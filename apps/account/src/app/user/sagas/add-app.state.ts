import { UserEntity } from '../entities/user.entity';
import { AddAppSaga } from './add-app.saga';

export abstract class AddAppSagaState {
  public saga: AddAppSaga;

  public setContext(saga: AddAppSaga): void {
    this.saga = saga;
  }

  public abstract activate(): Promise<{ link: string, user: UserEntity }>;
  public abstract deactivate(): Promise<{ user: UserEntity }>;
  public abstract delete(): Promise<{ user: UserEntity }>;
}
