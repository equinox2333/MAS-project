import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@/types';
import { Text, Icon, Input } from '@ui-kitten/components';

import Button from '@/components/Button';
import Layout from '@/components/Layout';
import { register } from '@/services/user';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<'Login'>>();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

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
      handleLogin();
    }
  };

  const styles = StyleSheet.create({
    body: {
      padding: 24,
    },
    title: {
      marginVertical: 60,
      textAlign: 'center',
    },
    input: {
      marginBottom: 24,
    },
    buttonContainer: {
      width: '90%',
      alignSelf: 'center',
      marginTop: 50,
    },
    register: {
      marginTop: 24,
      textAlign: 'center',
    },
  });

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
