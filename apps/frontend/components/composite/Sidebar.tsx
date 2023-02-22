import React, { type DetailedHTMLProps, type HTMLAttributes } from 'react';
import cn from 'classnames';

export interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className)} {...props}>
      {/* <Logo className={styles.logo} /> */}
      {/* <Search /> */}
      {/* <Menu /> */}
    </div>
  );
};
