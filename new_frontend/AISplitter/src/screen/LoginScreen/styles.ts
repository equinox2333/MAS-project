import { StyleSheet } from 'react-native';

export default function useStyles() {
  return StyleSheet.create({
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
}
