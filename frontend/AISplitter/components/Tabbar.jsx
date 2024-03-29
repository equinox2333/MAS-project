import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React, {useState, useRef} from "react";

const TabbarCmp = (props) => {
  console.log(`子组件`, props);
  let [curTabbar, setCurTabbar] = useState(0);

  function onTabChange(curIndex) {
    setCurTabbar(curIndex);
    props.onTabChange(curIndex);
  }

  return (
    <View style={styles.navBox}>
      <View style={styles.navBoxItem}>
        <TouchableOpacity
          onPress={() => {
            onTabChange(0);
          }}>
          <Image
            source={require("../assets/Favorite.png")}
            style={{
              width: 30,
              height: 30,
              backgroundColor: curTabbar === 0 ? "#dbff9e" : "",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.navBoxItem}>
        <TouchableOpacity
          onPress={() => {
            onTabChange(1);
          }}>
          <Image
            source={require("../assets/new.png")}
            style={{
              width: 30,
              height: 30,
              backgroundColor: curTabbar === 1 ? "#dbff9e" : "",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.navBoxItem}>
        <TouchableOpacity
          onPress={() => {
            onTabChange(2);
          }}>
          <Image
            source={require("../assets/calendar.png")}
            style={{
              width: 30,
              height: 30,
              backgroundColor: curTabbar === 2 ? "#dbff9e" : "",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // marginTop: 40,
    borderWidth: 1,
    borderColor: "red",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  topBAr: {
    height: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    // borderRadius: '20',
  },
  date: {
    alignSelf: "left",
  },
  navBox: {
    position: "fixed",
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    width: "100vw",
    flexDirection: "row",
    height: 40
  },
  navBoxItem: {
    flex: 1,
    width: "33.33%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default TabbarCmp;
