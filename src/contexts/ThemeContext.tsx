import { ThemeProvider } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

import { lightTheme } from '../themes';

export const ThemesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};
