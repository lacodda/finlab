
import React, { FunctionComponent, ReactNode } from 'react';
import { Footer, Navbar } from '../components';

export interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps): JSX.Element => {
  return (
    <>
      <Navbar color='transparent'/>
      <section className="grid grid-rows-auth-layout min-h-screen gap-4 pt-20">
        {children}
        <Footer />
      </section>
    </>
  );
};

export const withAuthLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AuthLayout>
        <Component {...props} />
      </AuthLayout>
    );
  };
};
