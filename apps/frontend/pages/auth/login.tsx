import React from 'react';
import { Button, Checkbox, Input } from '../../components';
import { withAuthLayout } from '../../layouts';

function Login(): JSX.Element {
  return (
    <>
      <div className='container mx-auto px-4 h-full'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-4/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-cyan-200 border-0'>
              <div className='rounded-t mb-0 px-6 py-6'>
                <div className='text-center mb-3'>
                  <h6 className='text-cyan-500 text-sm font-bold'>
                    Sign in with
                  </h6>
                </div>
                <hr className='mt-6 border-b-1 border-cyan-300' />
              </div>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <div className='text-cyan-400 text-center mb-3 font-bold'>
                  <small>Or sign in with credentials</small>
                </div>
                <form>
                  <Input type='email' placeholder='Email' label='Email' />
                  <Input type='password' placeholder='Password' label='Password' />
                  <Checkbox label='Remember me' />

                  <Button className='mt-6 w-full justify-center font-bold uppercase'>Sign In</Button>
                </form>
              </div>
            </div>
            <div className='flex flex-wrap mt-6 relative'>
              <div className='w-1/2'>
                <a
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                  className='text-cyan-200'
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className='w-1/2 text-right'>
                <a href='#' className='text-cyan-200'>
                  <small>Create new account</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthLayout(Login);
