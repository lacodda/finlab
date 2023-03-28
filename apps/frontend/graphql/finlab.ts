import { gql, useLazyQuery, ApolloClient, InMemoryCache, HttpLink, useMutation } from '@apollo/client';
import { useLocalStorage } from '../hooks';
import { type ILoginResponse, type State, type IAccessToken, type ILoginRequest, type ISignUpRequest, type ISignUpResponse, type ITimestampData } from './interfaces';

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

  public fetch = {
    auth: {
      Login: (variables: ILoginRequest): State<ILoginRequest, ILoginResponse> => {
        const LOGIN_MUTATION = gql`
          mutation login ($email: String!, $password: String!) {
            login(request: { email: $email, password: $password }) {
              access_token
            }
          }`;
        const [runFetch, { data, loading, error }] = useMutation(LOGIN_MUTATION, { client: this.client, variables });
        return { runFetch, data, loading, error };
      },
      SignUp: (variables: ISignUpRequest): State<ISignUpRequest, ISignUpResponse> => {
        const REGISTER_MUTATION = gql`
          mutation register ($email: String!, $password: String!, $displayName: String) {
            register(request: { email: $email, password: $password, displayName: $displayName}) {
              email
            }
          }`;
        const [runFetch, { data, loading, error }] = useMutation(REGISTER_MUTATION, { client: this.client, variables });
        return { runFetch, data, loading, error };
      }
    },
    workTime: {
      timestamp: {
        GetAll: (): State<undefined, ITimestampData> => {
          const TIMESTAMPS_QUERY = gql`
          query timestamps {
            timestamps {
              totalTime, workTime, breaks, data { type, timestamp }
            }
          }`;
          const [runFetch, { data, loading, error }] = useLazyQuery(TIMESTAMPS_QUERY, {
            client: this.client,
            context: {
              headers: {
                Authorization: `Bearer ${this.accessToken().token}`
              }
            }
          });
          return { runFetch, data, loading, error };
        }
      }
    }
  };
}
