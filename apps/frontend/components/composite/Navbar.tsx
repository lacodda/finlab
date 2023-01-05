import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface NavbarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}

export const Navbar = ({ children, className, ...props }: NavbarProps): JSX.Element => {
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        </div>
      </nav>
    </>
  );
};
