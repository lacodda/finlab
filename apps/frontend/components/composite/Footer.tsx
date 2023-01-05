import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

export interface FooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={cn('absolute w-full bottom-0 bg-gray-800 pb-6 text-white', className)} {...props}>
      <div>
        finlab © 2022 - {new Date().getFullYear()} All rights reserved
      </div>
      <a href="#" target="_blank">Terms of use</a>
      <a href="#" target="_blank">Privacy Policy</a>
    </footer>
  );
};