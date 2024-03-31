import React, { useEffect, useMemo, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { Button, CheckBox, Input, useTheme } from '@rneui/themed';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth, db } from '@/config/firebase';
import { PriorityEnum } from '@/constants';
import { logout } from '@/services/user';

import type { NavigationProp, TaskItem } from '@/types';

interface Route {
  params: {
    task?: TaskItem;
  };
}

interface Props {
  route: Route;
}

export default function AddTaskScreen(props: Props) {
  const { params } = props.route;
  const navigation = useNavigation<NavigationProp<'AddTaskScreen'>>();
  const { theme } = useTheme();
  const [task, setTask] = useState<TaskItem>(
    params?.task || ({ priority: PriorityEnum.Medium } as TaskItem),
  );
  const isEdit = useMemo(() => !!params?.task, [params]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    if (isEdit) {
      navigation.setOptions({ title: 'Edit Task' });
    } else {
      navigation.setOptions({ title: 'Add Task' });
    }
  }, [navigation, isEdit]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setTask((prevTask) => ({ ...prevTask, startTime: dayjs(date).format('YYYY-MM-DD') }));
    hideDatePicker();
  };

  const handleChanged = (key: string, value: string) => {
    setTask((prevTask) => ({ ...prevTask, [key]: value }));
  };

  const handleAddTask = async () => {
    try {
      await logout();
      const res = await auth.currentUser.getIdToken(true);
      console.debug('%c Line:69 🌮 res', 'color:#93c0a4', res);
    } catch (error) {
      console.error('Error verifying token validity: ', error);
    }
    // const taskListStr = await AsyncStorage.getItem('taskList');
    // const taskList = JSON.parse(taskListStr || '[]');
    // let newTaskList = taskList;
    // if (isEdit) {
    //   newTaskList = taskList.map((item: TaskItem) => {
    //     if (item.id === task.id) {
    //       return task;
    //     }
    //     return item;
    //   });
    // } else {
    //   const now = Date.now();
    //   newTaskList.push({
    //     id: now,
    //     createTime: now,
    //     completed: false,
    //     ...task,
    //   });
    // }
    // await AsyncStorage.setItem('taskList', JSON.stringify(newTaskList));
    // navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    body: {
      flex: 1,
    },
    main: {
      flexGrow: 1,
      padding: 20,
    },
    label: {
      marginLeft: 10,
      marginBottom: 5,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#86939e',
    },
    input: {
      marginBottom: 10,
    },
    footer: {
      paddingHorizontal: 20,
    },
    textArea: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      padding: 10,
      marginVertical: 10,
      height: 100,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback >
        <View style={styles.body}>
          <ScrollView contentContainerStyle={styles.main}>
            <Text style={styles.label}>Task Title</Text>
            <Input
              placeholder="Please input task title"
              value={task.title}
              onChangeText={(value) => handleChanged('title', value)}
              inputContainerStyle={styles.input}
            />

            <Text style={styles.label}>Date</Text>
            <TouchableOpacity activeOpacity={1} onPress={showDatePicker}>
              <Input
                placeholder="Please select date"
                value={task.startTime}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <Text style={styles.label}>Tags</Text>
            <Input
              placeholder='Please input tags, separated by ","'
              value={task.tags}
              onChangeText={(value) => handleChanged('tags', value)}
              inputContainerStyle={styles.input}
            />

            <Text style={styles.label}>Priority</Text>
            {Object.keys(PriorityEnum).map((option: PriorityEnum) => (
              <CheckBox
                key={option}
                title={option}
                checked={task.priority === option}
                onPress={() => handleChanged('priority', option)}
              />
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <Button
              title={isEdit ? 'Save' : 'Add Task'}
              disabled={!task.title?.trim()}
              onPress={handleAddTask}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
