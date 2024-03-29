import { useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Icon } from '@rneui/base';
import { Button, Input, useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import { login } from '@/services/user';

import type { NavigationProp } from '@/types';

export default function LoginScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<'Login'>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login({ email, password });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 24,
    },
    body: {
      flex: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginTop: 120,
      marginBottom: 60,
      textAlign: 'center',
    },
    buttonContainer: {
      width: '100%',
      marginTop: 24,
    },
    register: {
      marginTop: 24,
      textAlign: 'center',
    },
    registerBtn: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.body}>
        <View>
          <Text style={styles.title}>Login</Text>
          <Input
            placeholder="Please input email"
            leftIcon={<Icon name="mail" size={24} />}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Please input password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            leftIcon={<Icon name="lock" size={24} />}
          />
          <Button
            title="Login"
            loading={loading}
            containerStyle={styles.buttonContainer}
            onPress={handleLogin}
          />
          <Text style={styles.register}>
            Don't have an account?{' '}
            <Text style={styles.registerBtn} onPress={handleRegister}>
              Register
            </Text>{' '}
            here.
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
