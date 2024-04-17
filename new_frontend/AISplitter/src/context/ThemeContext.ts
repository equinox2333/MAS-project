import React from 'react';
import { Theme } from '@/constants/theme';

export const ThemeContext = React.createContext({
  theme: Theme.Light,
  toggleTheme: () => {},
});
