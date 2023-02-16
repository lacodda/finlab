import { useState, useEffect, type Dispatch } from 'react';

const isDarkKey = 'isDark';
const darkKey = 'dark';

export function useDarkMode(): [boolean, Dispatch<boolean>] {
  const [isDark, setTheme]: [boolean, Dispatch<boolean>] = useState(false);
  useEffect(() => { setTheme(JSON.parse(localStorage[isDarkKey] ?? '{}') === true); }, []);
  useEffect(() => {
    const root = window.document.documentElement;
    isDark ? root.classList.add(darkKey) : root.classList.remove(darkKey);
    localStorage.setItem(isDarkKey, isDark.toString());
  }, [isDark]);

  return [isDark, setTheme];
}
