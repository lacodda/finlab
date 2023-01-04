import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface EmptyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}

export const Empty = ({ children, className, ...props }: EmptyProps): JSX.Element => {
  return (
  <>
    <div className="relative w-full m-0"
      {...props}>
      {children}
    </div>
  </>
  );
};
