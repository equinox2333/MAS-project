import { StyleSheet, View } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import type { ImageProps } from 'react-native';

const Loading = (props: ImageProps) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

export default Loading;

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
