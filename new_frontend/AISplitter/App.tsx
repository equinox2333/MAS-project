import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import '@/config/firebase';

import LoginScreen from '@/screen/LoginScreen';
import RegisterScreen from '@/screen/RegisterScreen';
import HomeScreen from '@/screen/HomeScreen';
import AddTaskScreen from '@/screen/AddTaskScreen';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
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
          initialRouteName={isAuthenticated ? 'Home' : 'Login'}
          screenOptions={{
            headerBackTitle: 'Back',
          }}
        >
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="AddTask" component={AddTaskScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
