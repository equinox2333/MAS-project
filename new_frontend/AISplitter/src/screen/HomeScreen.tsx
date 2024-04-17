import { TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TasksScreen from '@/screen/TasksScreen';
import ProfileScreen from '@/screen/ProfileScreen';

import type { NavigationProp } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { Icon, useTheme } from '@ui-kitten/components';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<'Home'>>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
        },
      }}
      sceneContainerStyle={{
        paddingBottom: 20,
      }}
    >
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                name="checkmark-circle-outline"
                fill={color}
                style={{ width: size, height: size }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                top: -10,
                zIndex: 1,
                width: 60,
                height: 60,
                backgroundColor: theme['background-basic-color-1'],
                borderRadius: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddTask');
                }}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: theme['color-primary-500'],
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 1,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                }}
              >
                <Icon name="plus-outline" fill="#fff" style={{ width: size, height: size }} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" fill={color} style={{ width: size, height: size }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AddScreen() {
  return null;
}
