import type React from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

export interface FooterProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Footer = (props: FooterProps) => {
  const { style, children } = props;
  return <View style={[styles.footer, style]}>{children}</View>;
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    padding: 16,
  },
});
