import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { ModeSwitch } from '../elementary/ModeSwitch';

export interface NavbarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  color?: 'transparent' | 'default';
}

export const Navbar = ({ color = 'default', children, className, ...props }: NavbarProps): JSX.Element => {
  return (
    <nav className={cn('top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg', {
      'bg-white shadow': color === 'default'
    })}>
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        {children}
        <ModeSwitch className='ml-auto' />
      </div>
    </nav>
  );
};
