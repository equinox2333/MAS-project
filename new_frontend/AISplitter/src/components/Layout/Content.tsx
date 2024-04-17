import React from 'react';
import { ScrollView, View, StyleSheet, DeviceEventEmitter } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ContentProps {
  scrollable?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Content = (props: ContentProps) => {
  const { scrollable = true, style, children } = props;
  const scrollViewRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    const listener = DeviceEventEmitter.addListener('scrollToTop', () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    });

    return listener.remove;
  }, []);

  return scrollable ? (
    <ScrollView ref={scrollViewRef} style={[styles.body, style]}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.body, style]}>{children}</View>
  );
};

export default Content;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    flex: 1,
  },
});
