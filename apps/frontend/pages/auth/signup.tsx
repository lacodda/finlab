import React, { useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { Button, Checkbox, Input } from '../../components';
import { withAuthLayout } from '../../layouts';
import { useAuth } from '../../hooks';

function SignUpPage(): JSX.Element {
  const [displayName, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signUpError, signUp } = useAuth();
  const SignUp = (): void => {
    signUp({ displayName, email, password });
  };
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      SignUp();
    }
  };
  return (
    <>
      <div className='container mx-auto flex flex-col px-4 justify-center items-center'>
        <div className='relative flex flex-col min-w-0 break-words w-full sm:w-3/4 md:w-2/3 lg:w-1/3 mb-5 shadow-lg rounded-lg bg-sky-50 border border-cyan-600 dark:bg-slate-800'>
          <div className='mb-0 p-6'>
            <div className='text-center mb-3 text-cyan-600 text-sm font-bold'>Sign Up</div>
            <hr className='mt-6 border-b-1 border-cyan-600' />
          </div>
          <div className='flex-auto px-6 lg:px-8 py-8 pt-0'>
            <div className='text-red-500 font-bold'>{signUpError?.message}</div>
            <form>
              <Input type='text' placeholder='Name' label='Name' value={displayName} onChange={(e) => { setName(e.target.value); }} onKeyDown={handleKeyDown} />
              <Input type='email' placeholder='Email' label='Email' value={email} onChange={(e) => { setEmail(e.target.value); }} onKeyDown={handleKeyDown} />
              <Input type='password' placeholder='Password' label='Password' value={password} onChange={(e) => { setPassword(e.target.value); }} onKeyDown={handleKeyDown} />
              <Checkbox label='Remember me' />
              <Button className='mt-6 w-full justify-center font-bold uppercase' onClick={SignUp}>Sign Up</Button>
            </form>
          </div>
        </div>
        <Link href='/auth/login' className='text-sm text-cyan-400 hover:text-cyan-600'>Login</Link>
      </div>
    </>
  );
}

export default withAuthLayout(SignUpPage);
