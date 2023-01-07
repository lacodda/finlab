import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { ModeSwitch } from '../';

export interface NavbarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  color?: 'transparent' | 'default';
}

export const Navbar = ({ color = 'default', children, className, ...props }: NavbarProps): JSX.Element => {
  return (
    <nav className={cn('top-0 fixed z-50 w-full flex items-center px-2 py-3 navbar-expand-lg', {
      'bg-white shadow': color === 'default'
    })}>
      <div className="px-2 flex flex-wrap w-full items-center justify-between">
        {children}
      </div>
      <ModeSwitch className='ml-2 justify-self-end' />
    </nav>
  );
};
