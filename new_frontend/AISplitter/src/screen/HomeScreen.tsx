import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TaskListScreen from '@/screen/TaskListScreen';
import ProfileScreen from '@/screen/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="TaskList" component={TaskListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
