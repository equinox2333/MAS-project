import type React from 'react';
import { StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Layout as UILayout } from '@ui-kitten/components';
import type { LayoutProps as UILayoutProps } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

export interface LayoutProps extends UILayoutProps {
  statusBar?: boolean;
  safeArea?: boolean;
  keyboardDismiss?: boolean;
}

const Layout = (props: LayoutProps) => {
  const { style, statusBar = true, safeArea = true, keyboardDismiss = true, children } = props;

  return (
    <UILayout style={[styles.layout, style]}>
      {statusBar && <StatusBar />}
      <TouchableWithoutFeedback onPress={keyboardDismiss ? Keyboard.dismiss : () => {}}>
        {safeArea ? <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView> : children}
      </TouchableWithoutFeedback>
    </UILayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});

export default Layout;

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
