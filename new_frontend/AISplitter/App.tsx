import React from 'react';
import Toast from 'react-native-toast-message';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import mapping from '@/config/mapping';
import theme from '@/config/theme';

import { StorageKeyEnum } from '@/constants';
import { Theme } from '@/constants/theme';
import { ThemeContext } from '@/context/ThemeContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Router from '@/router';

export default function App() {
  const [systemTheme, setSystemTheme] = useLocalStorage<Theme>(StorageKeyEnum.Theme, {
    defaultValue: Theme.Light,
  });

  const toggleTheme = async () => {
    const nextTheme = systemTheme === Theme.Light ? Theme.Dark : Theme.Light;
    setSystemTheme(nextTheme);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme: systemTheme, toggleTheme }}>
        <ApplicationProvider
          {...eva}
          theme={Object.assign(eva[systemTheme], theme)}
          customMapping={mapping}
        >
          <Router />
        </ApplicationProvider>
      </ThemeContext.Provider>
      <Toast />
    </>
  );
}
