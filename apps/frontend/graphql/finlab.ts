import { gql, useLazyQuery, ApolloClient, InMemoryCache, HttpLink, useMutation, type CommonOptions, type QueryLazyOptions } from '@apollo/client';
import { useLocalStorage } from '../hooks';
import {
  type ILoginResponse, type IResult, type IAccessToken, type ILoginRequest, type ISignUpRequest, type ISignUpResponse, type ITimestampsResponse,
  type ITimestampsRequest, type ITimestampCreateRequest, type ITimestampCreateResponse, type ITimestampDeleteRequest, type ITimestampDeleteResponse,
  type IResultTuple
} from './interfaces';

export class FinlabApi {
  private readonly host: string = process.env.NEXT_PUBLIC_DOMAIN ?? '';
  private readonly client: ApolloClient<object>;

  constructor() {
    if (!this.client || typeof window === 'undefined') {
      this.client = new ApolloClient({
        link: new HttpLink({
          uri: this.host
        }),
        cache: new InMemoryCache(),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }

  private accessToken(): IAccessToken {
    const [token, setToken] = (() => useLocalStorage('access_token', ''))();
    return { token, setToken };
  }

  private getOptions<T>(isAuth = true): CommonOptions<QueryLazyOptions<T>> {
    const options: CommonOptions<QueryLazyOptions<T>> = {
      client: this.client
    };
    if (isAuth) {
      options.context = {
        ...options.context,
        headers: {
          ...options.context?.headers,
          Authorization: `Bearer ${this.accessToken().token}`
        }
      };
    }
    return options;
  }

  private getResult<T, R>([run, { data, loading, error }]: IResultTuple<T, R>): IResult<T, R> {
    return { exec: async (variables) => await run({ variables }), data, loading, error };
  }

  public methods = {
    auth: {
      Login: (): IResult<ILoginResponse, ILoginRequest> => {
        const mutation = gql`
          mutation login ($email: String!, $password: String!) {
            login (request: { email: $email, password: $password }) { access_token }
          }`;
        return this.getResult(useMutation(mutation, this.getOptions(false)));
      },
      SignUp: (): IResult<ISignUpResponse, ISignUpRequest> => {
        const mutation = gql`
          mutation register ($email: String!, $password: String!, $displayName: String) {
            register (request: { email: $email, password: $password, displayName: $displayName}) { email }
          }`;
        return this.getResult(useMutation<ISignUpResponse, ISignUpRequest>(mutation, this.getOptions(false)));
      }
    },
    workTime: {
      timestamp: {
        Get: (): IResult<ITimestampsResponse, ITimestampsRequest> => {
          const query = gql`
            query timestamps ($date: Date, $raw: Boolean) {
              timestamps (date: $date, raw: $raw) { totalTime, workTime, breaks, data { type, timestamp } }
          }`;
          return this.getResult(useLazyQuery(query, this.getOptions()));
        },
        Create: (): IResult<ITimestampCreateResponse, ITimestampCreateRequest> => {
          const mutation = gql`
            mutation createTimestamp ($timestamp: Date!, $type: TimestampType!) {
              createTimestamp (timestamp: $timestamp, type: $type) { data { type, timestamp } }
          }`;
          return this.getResult(useMutation<ITimestampCreateResponse, ITimestampCreateRequest>(mutation, this.getOptions()));
        },
        Delete: (): IResult<ITimestampDeleteResponse, ITimestampDeleteRequest> => {
          const mutation = gql`
            mutation deleteTimestamp ($timestamp: Date!) {
              deleteTimestamp (timestamp: $timestamp) { data { type, timestamp } }
          }`;
          return this.getResult(useMutation<ITimestampDeleteResponse, ITimestampDeleteRequest>(mutation, this.getOptions()));
        }
      }
    }
  };
}
