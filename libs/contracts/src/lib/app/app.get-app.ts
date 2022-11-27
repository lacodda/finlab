import { IsString } from 'class-validator';
import { IApp } from '@finlab/interfaces';

export namespace AppGetApp {
  export const topic = 'app.get-app.query';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    app: IApp | null;
  }
}
