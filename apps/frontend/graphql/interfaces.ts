import { type MutationFunctionOptions, type DefaultContext, type ApolloCache } from '@apollo/client';
import { type SetValue } from '../hooks';

export interface State<R, T> {
  data?: T;
  error?: Error;
  loading?: boolean;
  runFetch: (options?: MutationFunctionOptions<any, R, DefaultContext, ApolloCache<any>> | undefined) => Promise<any>;
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

export interface ITimestampData {
  timestamps: {
    data: ITimestamp[];
    totalTime: number;
    workTime: number[];
    breaks: number[];
  };
}

export interface IAccessToken {
  token: string;
  setToken: SetValue<string>;
}
