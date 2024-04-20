import type React from 'react';
import { StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { Spinner, Layout as UILayout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';

import type { LayoutProps as UILayoutProps } from '@ui-kitten/components';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

export interface LayoutProps extends UILayoutProps, SafeAreaViewProps {
  loading?: boolean;
  statusBar?: boolean;
  keyboardDismiss?: boolean;
}

const Layout = (props: LayoutProps) => {
  const {
    style,
    loading,
    statusBar = true,
    keyboardDismiss = true,
    children,
    ...safeAreaViewProps
  } = props;

  const content = loading ? (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Spinner />
    </View>
  ) : (
    children
  );

  return (
    <UILayout style={[styles.layout, style]}>
      {statusBar && <StatusBar />}
      <TouchableWithoutFeedback onPress={keyboardDismiss ? Keyboard.dismiss : () => {}}>
        <SafeAreaView style={{ flex: 1 }} {...safeAreaViewProps}>
          {content}
        </SafeAreaView>
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
