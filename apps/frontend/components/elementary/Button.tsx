import React, { type ButtonHTMLAttributes, type DetailedHTMLProps, type ReactNode } from 'react';
import cn from 'classnames';

export interface ButtonProps extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' | 'mode';
  size?: 's' | 'm' | 'l';
  outline?: boolean;
  rounded?: boolean;
  square?: boolean;
}

export const Button = ({ color = 'primary', size = 'm', outline = false, rounded = false, square = false, children, className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      type='button'
      className={cn('py-2 text-center inline-flex items-center ease-linear transition-all duration-150', className, {
        'bg-white active:bg-teal-50 text-zink-700 hover:text-teal-700 hover:border-teal-700 border border-zinc-700 shadow hover:shadow-md': color === 'primary',
        'text-cyan-900 hover:text-amber-200 dark:hover:text-amber-400 hover:bg-gray-700 dark:hover:bg-gray-100 hover:bg-opacity-50 dark:hover:bg-opacity-50 focus:outline-none focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-200 focus:ring-opacity-25 dark:focus:ring-opacity-25': color === 'mode',
        'px-2': square,
        'px-4': !square,
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
