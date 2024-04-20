import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@/types';
import { Text, Icon, Input } from '@ui-kitten/components';

import Button from '@/components/Button';
import Layout from '@/components/Layout';
import { register } from '@/services/user';

import useStyles from './styles';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<'Login'>>();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const styles = useStyles();

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

  return (
    <Layout style={styles.body}>
      <View>
        <Text category="h2" style={styles.title}>
          Register
        </Text>
        <Input
          label="Username"
          style={styles.input}
          placeholder="Please enter your username"
          accessoryLeft={<Icon name="person-outline" />}
          value={username}
          onChangeText={setUsername}
        />
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
        <Button loading={loading} onPress={handleRegister}>
          Register
        </Button>
        <Text style={styles.register}>
          Already have an account?{' '}
          <Text status="primary" category="s1" onPress={handleLogin}>
            Login
          </Text>{' '}
          here.
        </Text>
      </View>
    </Layout>
  );
}
