import { IsString } from 'class-validator';
import { AppStatus } from '@finlab/interfaces';

export namespace AccountChangedApp {
  export const topic = 'account.changed-app.event';

  export class Request {
    @IsString()
      userId: string;

    @IsString()
      appId: string;

    @IsString()
      appStatus: AppStatus;
  }
}
