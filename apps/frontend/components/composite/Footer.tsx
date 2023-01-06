import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import { BeakerIcon } from '@heroicons/react/24/solid';

export interface FooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={cn('grid lg:grid-cols-footer gap-3 p-5 text-center text-sm lg:text-start lg:text-base bg-gray-800 text-cyan-900 [&>a:hover]:text-cyan-400', className)} {...props}>
      <div className='flex gap-1 items-center'>
        <BeakerIcon className="h-5 w-5 text-cyan-900 inline-block"/>
        finlab © 2022 - {new Date().getFullYear()} All rights reserved
      </div>
      <a href="#" target="_blank">Terms of use</a>
      <a href="#" target="_blank">Privacy Policy</a>
    </footer>
  );
};
