import { gql, useLazyQuery, ApolloClient, InMemoryCache, HttpLink, useMutation, type CommonOptions, type QueryLazyOptions } from '@apollo/client';
import { useLocalStorage } from '../hooks';
import {
  type ILoginResponse, type Result, type IAccessToken, type ILoginRequest, type ISignUpRequest, type ISignUpResponse, type ITimestampsResponse,
  type ITimestampsRequest, type IOptionsParams, type ITimestampCreateRequest, type ITimestampCreateResponse, type ITimestampDeleteRequest,
  type ITimestampDeleteResponse
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

  private getOptions<T>(params: IOptionsParams<T> = {}): CommonOptions<QueryLazyOptions<T>> {
    const options: CommonOptions<QueryLazyOptions<T>> = {
      client: this.client
    };
    if (params?.auth !== false) {
      options.context = {
        ...options.context,
        headers: {
          ...options.context?.headers,
          Authorization: `Bearer ${this.accessToken().token}`
        }
      };
    }
    if (params?.variables) {
      options.variables = { ...params.variables };
    }
    return options;
  }

  public fetch = {
    auth: {
      Login: (): Result<ILoginResponse, ILoginRequest> => {
        const LOGIN_MUTATION = gql`
          mutation login ($email: String!, $password: String!) {
            login (request: { email: $email, password: $password }) { access_token }
          }`;
        const [run, { data, loading, error }] = useMutation<ILoginResponse, ILoginRequest>(LOGIN_MUTATION, this.getOptions({ auth: false }));
        return { exec: async (variables) => await run({ variables }), data, loading, error };
      },
      SignUp: (): Result<ISignUpResponse, ISignUpRequest> => {
        const REGISTER_MUTATION = gql`
          mutation register ($email: String!, $password: String!, $displayName: String) {
            register (request: { email: $email, password: $password, displayName: $displayName}) { email }
          }`;
        const [run, { data, loading, error }] = useMutation<ISignUpResponse, ISignUpRequest>(REGISTER_MUTATION, this.getOptions({ auth: false }));
        return { exec: async (variables) => await run({ variables }), data, loading, error };
      }
    },
    workTime: {
      timestamp: {
        Get: (): Result<ITimestampsResponse, ITimestampsRequest> => {
          const TIMESTAMPS_QUERY = gql`
            query timestamps ($date: Date, $raw: Boolean) {
              timestamps (date: $date, raw: $raw) { totalTime, workTime, breaks, data { type, timestamp } }
          }`;
          const [run, { data, loading, error }] = useLazyQuery<ITimestampsResponse, ITimestampsRequest>(TIMESTAMPS_QUERY, this.getOptions());
          return { exec: async (variables) => await run({ variables }), data, loading, error };
        },
        Create: (): Result<ITimestampCreateResponse, ITimestampCreateRequest> => {
          const MUTATION = gql`
            mutation createTimestamp ($timestamp: Date!, $type: TimestampType!) {
              createTimestamp (timestamp: $timestamp, type: $type) { data { type, timestamp } }
          }`;
          const [run, { data, loading, error }] = useMutation<ITimestampCreateResponse, ITimestampCreateRequest>(MUTATION, this.getOptions());
          return { exec: async (variables) => await run({ variables }), data, loading, error };
        },
        Delete: (): Result<ITimestampDeleteResponse, ITimestampDeleteRequest> => {
          const MUTATION = gql`
            mutation deleteTimestamp ($timestamp: Date!) {
              deleteTimestamp (timestamp: $timestamp) { data { type, timestamp } }
          }`;
          const [run, { data, loading, error }] = useMutation<ITimestampDeleteResponse, ITimestampDeleteRequest>(MUTATION, this.getOptions());
          return { exec: async (variables) => await run({ variables }), data, loading, error };
        }
      }
    }
  };
}
