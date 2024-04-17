import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';
import { EventKey } from '@/constants/event';

export interface Options<T> {
  defaultValue?: T;
}

export const useLocalStorage = <T>(key: string, options: Options<T>) => {
  const { defaultValue } = options;
  const [storedValue, setStoredValue] = React.useState<T>(defaultValue as T);

  const setValue = React.useCallback(
    async (value: T) => {
      try {
        setStoredValue(value);
        await AsyncStorage.setItem(key, JSON.stringify(value));
        DeviceEventEmitter.emit(EventKey.StoredValueUpdated, { key });
      } catch (error) {
        console.error(error);
      }
    },
    [key],
  );

  const init = React.useCallback(async () => {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    init();

    const listener = DeviceEventEmitter.addListener(
      EventKey.StoredValueUpdated,
      ({ key: updatedKey }: { key: string }) => {
        if (updatedKey === key) {
          init();
        }
      },
    );

    return listener.remove;
  }, [key]);

  return [storedValue, setValue] as const;
};
