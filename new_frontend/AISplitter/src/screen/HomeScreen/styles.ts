import { StyleSheet } from 'react-native';
import { useTheme } from '@ui-kitten/components';

export default function useStyles() {
  const theme = useTheme();

  return StyleSheet.create({
    addBtnContainer: {
      top: -10,
      zIndex: 1,
      width: 60,
      height: 60,
      backgroundColor: theme['background-basic-color-1'],
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addBtn: {
      width: 50,
      height: 50,
      backgroundColor: theme['color-primary-500'],
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 3,
      },
      shadowOpacity: 0.27,
    },
    icon: {
      width: 25,
      height: 25,
    },
    sceneContainerStyle: {
      paddingBottom: 20,
    },
  });
}
