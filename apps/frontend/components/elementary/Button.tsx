import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import cn from 'classnames';

export interface ButtonProps extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
  size?: 's' | 'm' | 'l';
  outline?: boolean;
  rounded?: boolean;
}

export const Button = ({ color = 'primary', size = 'm', outline = false, rounded = false, children, className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      type='button'
      className={cn('px-4 py-2 mr-1 mb-1 shadow hover:shadow-md text-center inline-flex items-center ease-linear transition-all duration-150', className, {
        'bg-white active:bg-teal-50 text-zink-700 hover:text-teal-700 hover:border-teal-700 border border-zinc-700': color === 'primary',
        'rounded-lg': !rounded,
        'rounded-full': rounded,
        'text-xs font-medium': size === 's',
        'text-sm font-medium': size === 'm',
        'text-base font-medium': size === 'l'
      })}
      {...props}
    >
      {children}
    </button>
  );
};
