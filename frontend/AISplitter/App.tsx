import AddTaskScreen from '@/screen/AddTaskScreen';
import LoginScreen from '@/screen/LoginScreen';
import RegisterScreen from '@/screen/RegisterScreen';
import TaskListScreen from '@/screen/TaskListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, createTheme } from '@rneui/themed';

import '@/config/firebase';
import { useCallback, useEffect, useState } from 'react';
import { verifyTokenValidity } from '@/services/user';
import { ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = createTheme({
    lightColors: {
      primary: '#756ef3',
    },
    darkColors: {
      primary: '#000',
    },
    components: {
      Button: {
        containerStyle: {
          width: '100%',
        },
        size: 'lg',
        radius: 'md',
      },
      Input: {
        inputContainerStyle: {
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#756ef3',
          paddingHorizontal: 10,
          paddingVertical: 2,
        },
      },
    },
    mode: 'light',
  });

  const init = useCallback(async () => {
    try {
      setLoading(true);
      const isTokenValid = await verifyTokenValidity();
      setIsAuthenticated(isTokenValid);
    } catch (error) {
      console.error('Error verifying token validity: ', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        size="large"
        color="#756ef3"
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? 'TaskListScreen' : 'LoginScreen'}
          screenOptions={{
            headerBackTitle: 'Back',
          }}
        >
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TaskListScreen"
            component={TaskListScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
