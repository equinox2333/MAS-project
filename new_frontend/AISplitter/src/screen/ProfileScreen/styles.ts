import { StyleSheet } from 'react-native';

export default function useStyles() {
  return StyleSheet.create({
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
}
