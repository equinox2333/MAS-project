import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Icon, Input } from '@ui-kitten/components';
import type { NavigationProp } from '@/types';

import Button from '@/components/Button';
import Layout from '@/components/Layout';
import { login } from '@/services/user';

import useStyles from './styles';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<'Login'>>();
  const [email, setEmail] = React.useState('test@gmail.com');
  const [password, setPassword] = React.useState('test123');
  const [loading, setLoading] = React.useState(false);
  const styles = useStyles();

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

  return (
    <Layout style={styles.body}>
      <View>
        <Text category="h2" style={styles.title}>
          Login
        </Text>
        <Input
          label="Email"
          style={styles.input}
          placeholder="Please enter your email"
          accessoryLeft={<Icon name="email-outline" />}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          style={styles.input}
          placeholder="Please enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          accessoryLeft={<Icon name="lock-outline" />}
        />
        <Button loading={loading} onPress={handleLogin}>
          Login
        </Button>
        <Text style={styles.register}>
          Don't have an account?{' '}
          <Text status="primary" category="s1" onPress={handleRegister}>
            Register
          </Text>{' '}
          here.
        </Text>
      </View>
    </Layout>
  );
}
