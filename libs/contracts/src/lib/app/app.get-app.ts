import { IsString } from 'class-validator';
import { type IApp } from '@finlab/interfaces';

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
