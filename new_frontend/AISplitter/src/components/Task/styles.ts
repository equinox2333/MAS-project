import { StyleSheet } from 'react-native';
import { useTheme } from '@ui-kitten/components';

interface Props {
  indent: number;
  height: number;
}

export default function useStyles(props: Props) {
  const theme = useTheme();
  const { indent, height } = props;

  return StyleSheet.create({
    container: {
      marginTop: indent > 0 ? 0 : 10,
      height: height,
    },
    completed: {
      textDecorationLine: 'line-through',
    },
    taskTitle: {
      lineHeight: 22,
      color: theme['text-basic-color'],
    },
    backTextWhite: {
      color: '#fff',
    },
    rowFront: {
      height: height,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: indent * 24 + 12,
      backgroundColor: theme['background-basic-color-2'],
    },
    item: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    extra: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
      gap: 8,
    },
    right: {
      width: 40,
      height: height,
      marginRight: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowBack: {
      height: height,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
    },
    backRightBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      height: height,
      width: 75,
    },
    backRightBtnLeft: {
      height: height,
      backgroundColor: theme['color-info-500'],
      right: 75,
    },
    backRightBtnRight: {
      height: height,
      backgroundColor: theme['color-danger-500'],
      right: 0,
    },
    icon: {
      width: 20,
      height: 20,
    },
  });
}
