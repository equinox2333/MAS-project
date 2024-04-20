import { TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TasksScreen from '@/screen/TasksScreen';
import ProfileScreen from '@/screen/ProfileScreen';

import { useNavigation } from '@react-navigation/native';
import { Icon } from '@ui-kitten/components';
import type { NavigationProp } from '@/types';

import useStyles from './styles';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<'Home'>>();
  const styles = useStyles();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
        },
      }}
      sceneContainerStyle={styles.sceneContainerStyle}
    >
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color }) => {
            return <Icon name="checkmark-circle-outline" fill={color} style={styles.icon} />;
          },
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => {
            return (
              <View style={styles.addBtnContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AddTask');
                  }}
                  style={styles.addBtn}
                >
                  <Icon name="plus-outline" fill="#fff" style={styles.icon} />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" fill={color} style={styles.icon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AddScreen() {
  return null;
}
