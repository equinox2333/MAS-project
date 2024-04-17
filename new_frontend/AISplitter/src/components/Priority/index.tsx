import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, useTheme } from '@ui-kitten/components';

import { PriorityEnumMapping, type PriorityEnum } from '@/constants';

export interface PriorityProps {
  priority: PriorityEnum;
}

export function Priority(props: PriorityProps) {
  const theme = useTheme();
  const { priority } = props;
  const { label, color } = PriorityEnumMapping[priority] || {};
  return (
    <View style={styles.container}>
      <Icon name="flag-outline" fill={theme[color]} style={styles.flag} />
      <Text category="c1" appearance="hint">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flag: {
    width: 20,
    height: 20,
  },
});
