import { StyleSheet } from 'react-native';
import { useTheme } from '@ui-kitten/components';

export default function useStyles() {
  const theme = useTheme();

  return StyleSheet.create({
    input: {
      marginBottom: 20,
    },
    label: {
      fontSize: 12,
      fontWeight: '900',
      color: theme['text-hint-color'],
      marginBottom: 5,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: 10,
      marginBottom: 20,
    },
    checkBox: {
      marginVertical: 10,
    },
    inputTextStyle: {
      minHeight: 64,
    },
  });
}
