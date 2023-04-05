import { Client, cacheExchange, fetchExchange, gql } from 'urql';
import {
  type ILoginResponse, type IResult, type ILoginRequest, type ISignUpRequest, type ISignUpResponse, type ITimestampsResponse, type ITimestampsRequest,
  type ITimestampCreateRequest, type ITimestampCreateResponse, type ITimestampDeleteRequest, type ITimestampDeleteResponse
} from './interfaces';

export class FinlabApi {
  private readonly host: string = process.env.NEXT_PUBLIC_DOMAIN ?? '';
  private readonly client: Client;

  constructor() {
    if (!this.client || typeof window === 'undefined') {
      this.client = new Client({
        url: this.host,
        exchanges: [cacheExchange, fetchExchange],
        requestPolicy: 'cache-and-network',
        fetchOptions: () => {
          return {
            headers: { Authorization: `Bearer ${this.getToken()}` }
          };
        }
      });
    }
  }

  private getToken(): string {
    const tokenString = localStorage.getItem('access_token') ?? '';
    return JSON.parse(tokenString);
  }

  public methods = {
    auth: {
      login: async (params: ILoginRequest): Promise<IResult<ILoginResponse>> => {
        const mutation = gql`
          mutation login ($email: String!, $password: String!) {
            login (request: { email: $email, password: $password }) { access_token }
          }`;
        return await this.client.mutation(mutation, params);
      },
      signUp: async (params: ISignUpRequest): Promise<IResult<ISignUpResponse>> => {
        const mutation = gql`
          mutation register ($email: String!, $password: String!, $displayName: String) {
            register (request: { email: $email, password: $password, displayName: $displayName}) { email }
          }`;
        return await this.client.mutation(mutation, params);
      }
    },
    workTime: {
      timestamp: {
        list: async (params?: ITimestampsRequest): Promise<IResult<ITimestampsResponse>> => {
          const query = gql`
            query timestamps ($date: Date, $raw: Boolean) {
              timestamps (date: $date, raw: $raw) { totalTime, workTime, breaks, data { type, timestamp } }
          }`;
          return await this.client.query(query, params);
        },
        create: async (params: ITimestampCreateRequest): Promise<IResult<ITimestampCreateResponse>> => {
          const mutation = gql`
            mutation createTimestamp ($timestamp: Date!, $type: TimestampType!) {
              createTimestamp (timestamp: $timestamp, type: $type) { data { type, timestamp } }
          }`;
          return await this.client.mutation(mutation, params);
        },
        delete: async (params: ITimestampDeleteRequest): Promise<IResult<ITimestampDeleteResponse>> => {
          const mutation = gql`
            mutation deleteTimestamp ($timestamp: Date!) {
              deleteTimestamp (timestamp: $timestamp) { data { type, timestamp } }
          }`;
          return await this.client.mutation(mutation, params);
        }
      }
    }
  };
}
