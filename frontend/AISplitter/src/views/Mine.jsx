import React, {useState, useRef} from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
const windowHeight = Dimensions.get('window').height;

import {formateDate} from "../../utils/common";
import {LocaleConfig,} from 'react-native-calendars';
// import {LocaleConfig, Calendar} from 'react-native-calendars';
import Calendar from '../../components/react-native-calendars/src/calendar/index';
// import { default as LocaleConfig } from 'xdate';
// import XDate from 'xdate'
// 日历组件 中文替换
// XDate.locales['fr'] = {
//   monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
//   monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
//   dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
//   dayNamesShort: ['Sun.', 'Mon.', 'Tues.', 'Web.', 'Thur.', 'Fri.', 'Sat.']
// };
// XDate.defaultLocale = 'fr';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// 日历组件 标记点的颜色
const vacation = {key: 'vacation', color: '#33D9B5', selectedDotColor: '#33D9B5'};
const Mine = () => {
  return (
    <View >
      <Calendar
        testID='Calendar123'
        current={'2024-03-08'}
        monthFormat={' yyyy MM '}
        markedDates={{
          // '2024-03-10': {selected: true, selectedColor: '#00adf5',},
        }}
        markeTextObj={{
          '2024-03-08': [
            {title: 'Task1', isComplete: true},
            {
              title: 'Task2',
              isComplete: false
            },
            {title: 'Task3', isComplete: false}]
        }}
        markingType={'multi-dot'}

      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
export default Mine;
