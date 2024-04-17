import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Spinner, useTheme } from '@ui-kitten/components';

import { StorageKeyEnum } from '@/constants';
import { Theme } from '@/constants/theme';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import '@/config/firebase';

import AddTaskScreen from '@/screen/AddTaskScreen';
import HomeScreen from '@/screen/HomeScreen';
import LoginScreen from '@/screen/LoginScreen';
import RegisterScreen from '@/screen/RegisterScreen';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function Router() {
  const [loading, setLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const theme = useTheme();
  const [systemTheme] = useLocalStorage<Theme>(StorageKeyEnum.Theme, {
    defaultValue: Theme.Light,
  });

  const MyTheme = {
    dark: systemTheme === Theme.Dark,
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme['color-primary-500'],
      background: theme['background-basic-color-1'],
      card: theme['background-basic-color-1'],
      text: theme['text-basic-color'],
      border: theme['border-basic-color-5'],
    },
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setIsAuthenticated(!!user);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner />
      </View>
    );
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Home' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
