import { useState } from 'react';
import {
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import { Button, Input, useTheme } from '@rneui/themed';

import { register } from '@/services/user';

import type { NavigationProp } from '@/types';

export default function RegisterScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<'Register'>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await register({ email, password, username });
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
      marginTop: 90,
      marginBottom: 60,
      textAlign: 'center',
    },
    buttonContainer: {
      marginTop: 24,
    },
    login: {
      marginTop: 24,
      textAlign: 'center',
    },
    loginBtn: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.body}>
        <View>
          <Text style={styles.title}>Register</Text>
          <Input
            placeholder="Username"
            leftIcon={<Icon name="person" size={24} />}
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="Email"
            leftIcon={<Icon name="mail" size={24} />}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            leftIcon={<Icon name="lock" size={24} />}
          />
          <Button
            title="Register"
            loading={loading}
            containerStyle={styles.buttonContainer}
            onPress={handleRegister}
          />
          <Text style={styles.login}>
            Already have an account?{' '}
            <Text style={styles.loginBtn} onPress={handleLogin}>
              Login
            </Text>{' '}
            here.
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
