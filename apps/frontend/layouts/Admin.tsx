
import React, { FunctionComponent, ReactNode } from 'react';
import { Footer, Navbar } from '../components';

export interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <section className="grid grid-rows-Admin-layout min-h-screen gap-4">
        {children}
        <Footer />
      </section>
    </>
  );
};

export const withAdminLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AdminLayout>
        <Component {...props} />
      </AdminLayout>
    );
  };
};
