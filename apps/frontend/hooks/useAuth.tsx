import { useRouter } from 'next/router';
import React, { useState, useEffect, type Dispatch, createContext, useContext, type PropsWithChildren } from 'react';
import jwtDecode, { type JwtPayload } from 'jwt-decode';
import { FinlabApi, type ILoginResponse, type ISignUpResponse, type ILoginRequest, type ISignUpRequest } from '../graphql';
import { useLocalStorage } from '.';

interface IUser {
  id: string;
  email: string;
  displayName?: string;
}

export interface IAuthContext {
  user?: IUser | null;
  signIn: Dispatch<ILoginRequest>;
  signInError?: Error;
  signUp: Dispatch<ISignUpRequest>;
  signUpError?: Error;
  signOut: Dispatch<unknown>;
  sendPasswordResetEmail?: Dispatch<ILoginRequest>;
  confirmPasswordReset?: Dispatch<ILoginRequest>;
}

export const AuthContext = createContext<IAuthContext>({
  signIn: () => undefined,
  signUp: () => undefined,
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
  const [user, setUser]: [IUser | undefined | null, Dispatch<IUser | undefined | null>] = useState();
  const [signInRequest, signIn]: [ILoginRequest, Dispatch<ILoginRequest>] = useState({ email: '', password: '' });
  const [signUpRequest, signUp]: [ISignUpRequest, Dispatch<ISignUpRequest>] = useState({ email: '', password: '' });
  const [signInData, setSignInData]: [ILoginResponse | undefined, Dispatch<ILoginResponse | undefined>] = useState();
  const [signInError, setSignInError]: [Error | undefined, Dispatch<Error | undefined>] = useState();
  const [signUpData, setSignUpData]: [ISignUpResponse | undefined, Dispatch<ISignUpResponse | undefined>] = useState();
  const [signUpError, setSignUpError]: [Error | undefined, Dispatch<Error | undefined>] = useState();
  const [token, setToken] = useLocalStorage('access_token', '');
  const router = useRouter();

  async function runSignIn(): Promise<void> {
    const { data, error } = await FinlabApi.auth.login(signInRequest);
    setSignInData(data);
    setSignInError(error);
  }

  async function runSignUp(): Promise<void> {
    const { data, error } = await FinlabApi.auth.signUp(signUpRequest);
    setSignUpData(data);
    setSignUpError(error);
  }

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded) {
      const { id, email, displayName } = { id: '', email: '', displayName: undefined, ...decoded };
      setUser({ id, email, displayName });
    } else {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (!signInRequest.email || !signInRequest.password) return;
    void runSignIn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInRequest]);

  useEffect(() => {
    if (!signUpRequest.email || !signUpRequest.password) return;
    void runSignUp();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpRequest]);

  useEffect(() => {
    if (!signInData?.login.access_token) return;

    setToken(signInData.login.access_token);
    void router.push({
      pathname: '/'
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInData]);

  useEffect(() => {
    if (!signUpData?.register.email) return;

    void router.push({
      pathname: '/auth/login'
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpData]);

  function signOut(): void {
    setToken('');
    setUser(null);
    void router.push('/auth/login');
  }

  return { user, signIn, signInError, signUp, signUpError, signOut };
}

export function useRequireAuth(redirectUrl = '/auth/login'): IAuthContext {
  const auth = useAuth();
  const router = useRouter();
  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (auth?.user === null) {
      void router.push(redirectUrl);
    }
  }, [auth, redirectUrl, router]);

  return auth;
}
