import { type LazyQueryResult, type OperationVariables } from '@apollo/client';
import { type SetValue } from '../hooks';

export interface Result<T> extends Partial<LazyQueryResult<T, OperationVariables>> {
  runFetch: () => Promise<unknown>;
}

export interface IOptionsParams<T> {
  variables?: T;
  auth?: boolean;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  login: {
    access_token: string;
  };
}

export interface ISignUpRequest {
  email: string;
  password: string;
  displayName?: string;
}

export interface ISignUpResponse {
  register: {
    email: string;
  };
}

export enum TimestampType {
  Start = 'Start',
  End = 'End',
  StartBreak = 'StartBreak',
  EndBreak = 'EndBreak'
}

export interface ITimestamp {
  timestamp: string;
  type: TimestampType;
}

export interface ITimestampsRequest {
  date?: Date;
  raw?: boolean;
}

export interface ITimestampsResponse {
  timestamps: {
    data: ITimestamp[];
    totalTime: number;
    workTime: number[];
    breaks: number[];
  };
}

export interface ITimestampCreateRequest {
  timestamp: Date;
  type: TimestampType;
}

export interface ITimestampCreateResponse {
  create: ITimestamp;
}

export interface ITimestampDeleteRequest {
  timestamp: Date;
}

export interface ITimestampDeleteResponse {
  delete: ITimestamp;
}

export interface IAccessToken {
  token: string;
  setToken: SetValue<string>;
}
