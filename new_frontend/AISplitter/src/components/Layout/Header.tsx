import React from 'react';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import type { IconElement, TopNavigationProps } from '@ui-kitten/components';
import type { NavigationProp } from '@/types/navigation';
import { DeviceEventEmitter, Text } from 'react-native';

const BackIcon = (props: any): IconElement => {
  const navigation = useNavigation<NavigationProp<'Home'>>();

  const goBack = () => {
    navigation.goBack();
  };

  return <Icon {...props} name="arrow-back" onPress={goBack} />;
};

const BackAction = () => <TopNavigationAction icon={BackIcon} />;

export interface HeaderProps extends TopNavigationProps {
  title: string;
  showBack?: boolean;
}

const Header = (props: HeaderProps) => {
  const { showBack, title, ...restProps } = props;

  const goTop = () => {
    DeviceEventEmitter.emit('scrollToTop');
  };

  return (
    <TopNavigation
      alignment="center"
      accessoryLeft={showBack ? BackAction : undefined}
      title={(titleProps) => (
        <Text {...titleProps} onPress={goTop}>
          {title}
        </Text>
      )}
      {...restProps}
    />
  );
};

export default Header;
