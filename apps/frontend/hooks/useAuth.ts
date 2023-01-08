import { useRouter } from 'next/router';
import { useState, useEffect, Dispatch } from 'react';
import { FinlabApi } from '../api';
import { ILoginRequest } from '../api/finlab.api';
import { useLocalStorage } from './';

interface State {
  error?: Error;
  setAuth: Dispatch<ILoginRequest>;
}

export function useAuth(): State {
  const [loginRequest, setAuth]: [ILoginRequest, Dispatch<ILoginRequest>] = useState({ email: '', password: '' });
  const [, setToken] = useLocalStorage('access_token', '');
  const { runFetch, data, error } = FinlabApi.auth.Login(loginRequest);
  const router = useRouter();

  useEffect(() => {
    if (!loginRequest.email || !loginRequest.password) return;

    runFetch(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginRequest]);

  useEffect(() => {
    if (!data?.access_token) return;

    setToken(data.access_token);
    void router.push({
      pathname: '/'
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { error, setAuth };
}
