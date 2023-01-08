import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

export interface EmptyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}

export const Empty = ({ children, className, ...props }: EmptyProps): JSX.Element => {
  return (
  <>
    <div className={cn('relative w-full m-0', className)}
      {...props}>
      {children}
    </div>
  </>
  );
};
