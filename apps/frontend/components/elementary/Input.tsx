import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  children?: ReactNode;
  label?: string;
}

export const Input = ({ label, children, className, ...props }: InputProps): JSX.Element => {
  return (
  <>
    <div className="relative w-full mb-3">
      <label
        className="block text-zinc-600 text-xs mb-2"
      >
        {label}
      </label>
      <input
        className="border-0 px-3 py-3 placeholder-zinc-300 text-zinc-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        {...props}
      />
    </div>
  </>
  );
};
