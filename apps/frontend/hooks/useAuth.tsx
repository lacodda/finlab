import { useRouter } from 'next/router';
import React, { useState, useEffect, Dispatch, createContext, useContext, PropsWithChildren } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { FinlabApi } from '../api';
import { ILoginRequest } from '../api/finlab.api';
import { useLocalStorage } from '.';

interface IUser {
  id: string;
  email: string;
  name?: string;
}

export interface IAuthContext {
  error?: Error;
  user?: IUser;
  signIn: Dispatch<ILoginRequest>;
  signUp?: Dispatch<ILoginRequest>;
  signOut: Dispatch<unknown>;
  sendPasswordResetEmail?: Dispatch<ILoginRequest>;
  confirmPasswordReset?: Dispatch<ILoginRequest>;
}

export const AuthContext = createContext<IAuthContext>({
  signIn: () => undefined,
  signOut: () => undefined
});

// Provider component that wraps app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: PropsWithChildren<IAuthContext>): JSX.Element {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

export function useProvideAuth(): IAuthContext {
  const [user, setUser]: [IUser | undefined, Dispatch<IUser | undefined>] = useState();
  const [loginRequest, signIn]: [ILoginRequest, Dispatch<ILoginRequest>] = useState({ email: '', password: '' });
  const [token, setToken] = useLocalStorage('access_token', '');
  const { runFetch, data, error } = FinlabApi.auth.Login(loginRequest);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded) {
      const { id, email, name } = { id: '', email: '', name: undefined, ...decoded };
      setUser({ id, email, name });
    }
  }, [token]);

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

  function signOut(): void {
    setToken('');
    setUser(undefined);
    void router.push({
      pathname: '/auth/login'
    });
  }

  return { user, error, signIn, signOut };
}
