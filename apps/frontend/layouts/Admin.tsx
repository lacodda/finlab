
import React, { type FunctionComponent, type ReactNode } from 'react';
import Link from 'next/link';
import { Button, Footer, Navbar } from '../components';
import { useAuth } from '../hooks';

export interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps): JSX.Element => {
  const { user, signOut } = useAuth();
  return (
    <>
      <Navbar>
        { user?.email
          ? (<>
          <Link className='ml-auto' href='/user'>{user?.displayName ?? user.email}</Link>
          <Button className='ml-4' onClick={signOut}>Log Out</Button>
          </>)
          : <Link className='ml-auto' href='/auth/login'><Button>Log In</Button></Link>
        }
      </Navbar>
      <section className='grid grid-rows-Admin-layout min-h-screen gap-4'>
        <div className='p-4'>
          {children}
        </div>
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
