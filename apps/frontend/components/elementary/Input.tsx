import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import cn from 'classnames';

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className, ...props }: InputProps): JSX.Element => {
  return (
  <>
    <div className='relative w-full mb-3'>
      <label className='block text-zinc-600 dark:text-white text-xs mb-2'>{label}</label>
      <input
        className={cn('border-0 px-3 py-3 placeholder-zinc-300 text-zinc-600 bg-white dark:bg-zinc-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150', className)}
        {...props}
      />
    </div>
  </>
  );
};
