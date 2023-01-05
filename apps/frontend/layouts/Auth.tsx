
import React, { FunctionComponent, ReactNode } from 'react';
import { Navbar, Footer } from '../components';

export interface LayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen bg-sky-50">
          {children}
          <Footer />
        </section>
      </main>
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
