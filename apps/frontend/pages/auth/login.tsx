import React from 'react';
import { Button, Checkbox, Input } from '../../components';
import { withAuthLayout } from '../../layouts';

function Login(): JSX.Element {
  return (
    <>
      <div className='container mx-auto flex flex-col px-4 justify-center items-center'>
        <div className='relative flex flex-col min-w-0 break-words w-full md:w-2/3 lg:w-1/3 mb-5 shadow-lg rounded-lg bg-sky-50 border border-cyan-600 dark:bg-slate-800'>
          <div className='mb-0 p-6'>
            <div className='text-center mb-3 text-cyan-600 text-sm font-bold'>Sign in with credentials</div>
            <hr className='mt-6 border-b-1 border-cyan-600' />
          </div>
          <div className='flex-auto px-6 lg:px-8 py-8 pt-0'>
            <form>
              <Input type='email' placeholder='Email' label='Email' />
              <Input type='password' placeholder='Password' label='Password' />
              <Checkbox label='Remember me' />
              <Button className='mt-6 w-full justify-center font-bold uppercase'>Sign In</Button>
            </form>
          </div>
        </div>
        <a href='#' className='text-sm text-cyan-400 hover:text-cyan-600'>Create new account</a>
      </div>
    </>
  );
}

export default withAuthLayout(Login);
