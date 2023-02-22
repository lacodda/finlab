import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import React, { type DetailedHTMLProps, type HTMLAttributes, type ReactNode, useEffect, useState } from 'react';
import { Button } from './Button';
import { useDarkMode } from '../../hooks';

export interface EmptyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}

export const ModeSwitch = ({ children, className, ...props }: EmptyProps): JSX.Element => {
  const [isDark, setTheme] = useDarkMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const ModeSwitchIcon = (): JSX.Element => {
    if (!mounted) return <></>;
    if (isDark) {
      return <SunIcon className='h-6 w-6'/>;
    } else {
      return <MoonIcon className='h-6 w-6'/>;
    }
  };

  return (
    <Button color='mode' square={true} className={className} onClick={() => { setTheme(!isDark); }}>
      {ModeSwitchIcon()}
    </Button>
  );
};
