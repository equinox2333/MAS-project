import React from 'react';
import { StyleSheet, View } from 'react-native';

import { logout } from '@/services/user';
import Button from '@/components/Button';
import { ThemeContext } from '@/context/ThemeContext';
import Layout from '@/components/Layout';
import { Avatar, Icon, Text, TopNavigationAction } from '@ui-kitten/components';
import { Theme } from '@/constants/theme';
import { auth } from '@/config/firebase';

export default function ProfileScreen() {
  const [loading, setLoading] = React.useState(false);
  const themeContext = React.useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderRightActions = () => (
    <TopNavigationAction
      icon={
        themeContext.theme === Theme.Dark ? (
          <Icon name="moon-outline" />
        ) : (
          <Icon name="sun-outline" />
        )
      }
      onPress={themeContext.toggleTheme}
    />
  );

  return (
    <Layout>
      <Layout.Header title="Profile" accessoryRight={renderRightActions} />
      <Layout.Content>
        <View style={styles.container}>
          <Avatar style={styles.avatar} size="giant" source={require('../../assets/avatar.png')} />
          <Text style={styles.username} category="h5">
            {auth.currentUser.displayName}
          </Text>
          <Text style={styles.email} category="h6">
            {auth.currentUser.email}
          </Text>
        </View>
      </Layout.Content>
      <Layout.Footer>
        <Button style={styles.logout} loading={loading} onPress={handleLogout}>
          Logout
        </Button>
      </Layout.Footer>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  username: {
    marginTop: 20,
  },
  email: {
    marginTop: 20,
  },
  logout: {
    width: 200,
    alignSelf: 'center',
  },
});
