import useFetch from '../hooks/useFetch';
import { SetValue, useLocalStorage } from '../hooks/useLocalStorage';

export type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface IFetchOptionsParams<T> {
  method?: HttpMethods;
  body?: T;
  options?: RequestInit;
  contentType?: string;
  auth?: boolean;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
}

export enum TimestampType {
  Start = 'Start',
  End = 'End',
  StartBreak = 'StartBreak',
  EndBreak = 'EndBreak'
}

export interface ITimestamp {
  _id?: string;
  userId: string;
  timestamp: string;
  type: TimestampType;
}

export interface ITimestampData {
  data: ITimestamp[];
}

interface IAccessToken {
  token: string;
  setToken: SetValue<string>;
}

export class FinlabApi {
  private readonly host: string = process.env.NEXT_PUBLIC_DOMAIN ?? '';

  private accessToken(): IAccessToken {
    const [token, setToken] = (() => useLocalStorage('access_token', ''))();
    return { token, setToken };
  }

  private getOptions<T>(optionsParams: IFetchOptionsParams<T> = {}): RequestInit {
    const fetchOptions: RequestInit = {
      ...optionsParams.options,
      method: optionsParams.method ?? 'GET',
      headers: {
        'Content-Type': optionsParams.contentType ?? 'application/json'
      }
    };

    if (optionsParams.body) {
      fetchOptions.body = JSON.stringify(optionsParams.body);
    }

    if (optionsParams.auth !== false) {
      // const Token = (() => useLocalStorage('access_token', ''))()[0];
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${this.accessToken().token}`
      };
    }
    return fetchOptions;
  }

  private getUrl(url: string): string {
    const re = /^\/|\/$/g;
    return [this.host, url].map(i => i.replace(re, '')).join('/');
  }

  public fetch = {
    auth: {
      Login: (body: ILoginRequest) => useFetch<ILoginResponse>(this.getUrl('/api/auth/login'),
        this.getOptions({
          method: 'POST',
          body,
          auth: false
        }))
    },
    workTime: {
      timestamp: {
        GetAll: () => useFetch<ITimestampData>(this.getUrl('/api/work-time/timestamp'),
          this.getOptions()
        )
      }
    }
  };
}
