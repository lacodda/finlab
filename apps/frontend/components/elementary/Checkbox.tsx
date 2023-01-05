import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  children?: ReactNode;
  label?: string;
}

export const Checkbox = ({ label, children, className, ...props }: CheckboxProps): JSX.Element => {
  return (
    <div>
      <label className='inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          className='form-checkbox border-0 rounded text-cyan-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
          {...props}
        />
        <span className='ml-2 text-sm font-semibold text-cyan-600'>
          {label}
        </span>
      </label>
    </div>
  );
};
