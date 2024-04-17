import { Icon } from '@ui-kitten/components';
import { StyleSheet, Text, View } from 'react-native';

import type { ViewStyle } from 'react-native';

interface EmptyProps {
  type?: 'no_data' | 'network_error';
  onPress?: () => void;
  style?: ViewStyle;
}

const Empty = (props: EmptyProps) => {
  const { type = 'no_data', onPress, style } = props;

  let iconName: string;
  let text: string;
  switch (type) {
    case 'network_error':
      iconName = 'wifi-off-outline';
      text = 'Network error, please check and try again';
      break;
    default:
      iconName = 'inbox-outline';
      text = 'No data available';
      break;
  }

  return (
    <View
      style={{
        ...styles.container,
        ...style,
      }}
    >
      <Icon name={iconName} style={{ width: 100, height: 100 }} fill="#999" />
      <Text style={styles.text}>{text}</Text>
      {onPress && (
        <Text style={styles.button} onPress={onPress}>
          Try again
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '40%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  button: {
    fontSize: 16,
    color: '#007aff',
    marginTop: 20,
  },
});

export default Empty;
