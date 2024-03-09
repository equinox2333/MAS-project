import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {SafeAreaView} from "react-native-safe-area-context"; // 安全边界
const Stack = createStackNavigator();

import CreateTask from "./components/temp";
import HomeStack from "./src/views/Home.jsx";


export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      {/* <StatusBar style='auto' /> */}
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          options={{
            title: "HOME",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={HomeStack}>
        </Stack.Screen>
        <Stack.Screen
          name="createtask"
          options={{
            title: "Create Task",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={CreateTask}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
