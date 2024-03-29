import Empty from '@/components/Empty';
import type { NavigationProp, TaskItem } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, CheckBox } from '@rneui/themed';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

interface Data {
  item: TaskItem;
}

export default function TaskListScreen() {
  const navigation = useNavigation<NavigationProp<'TaskListScreen'>>();
  const [taskList, setTaskList] = useState([] as TaskItem[]);

  const handleRefresh = useCallback(async () => {
    const taskListStr = await AsyncStorage.getItem('taskList');
    const newTaskList = JSON.parse(taskListStr || '[]') as TaskItem[];
    setTaskList(() => newTaskList.sort((a, b) => b.createTime - a.createTime));
  }, []);

  const handleCheckBoxPress = (item: TaskItem) => {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === item.id ? { ...task, completed: !item.completed } : task,
      ),
    );
  };

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  useEffect(() => {
    if (taskList.length > 0) {
      AsyncStorage.setItem('taskList', JSON.stringify(taskList || []));
    }
  }, [taskList]);

  useFocusEffect(
    useCallback(() => {
      handleRefresh();
    }, [handleRefresh]),
  );

  const renderItem = ({ item }: Data) => {
    return (
      <View style={styles.rowFront}>
        <CheckBox
          checked={item.completed}
          title={
            <View style={styles.item}>
              <Text
                style={[
                  item.completed ? { textDecorationLine: 'line-through' } : null,
                  { lineHeight: 22 },
                ]}
              >
                {item.title}
              </Text>
              {item.startTime ? <Text>{dayjs(item.startTime).format('MMM D')}</Text> : null}
            </View>
          }
          onPress={() => handleCheckBoxPress(item)}
        />
      </View>
    );
  };

  const handleClose = (rowMap: object, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const handleDelete = (rowMap: object, data: TaskItem) => {
    handleClose(rowMap, data.id);
    const newData = [...taskList];
    const prevIndex = taskList.findIndex((item) => item.id === data.id);
    newData.splice(prevIndex, 1);
    setTaskList([...newData]);
  };

  const handleEdit = (rowMap: object, data: TaskItem) => {
    handleClose(rowMap, data.id);
    navigation.navigate('AddTaskScreen', { task: data });
  };

  const renderHiddenItem = (data: Data, rowMap: object) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => handleEdit(rowMap, data.item)}
        >
          <Text style={styles.backTextWhite}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => handleDelete(rowMap, data.item)}
        >
          <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.body}>
          <Text style={styles.title}>Task List</Text>
          <SwipeListView
            data={taskList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            ListEmptyComponent={<Empty />}
            leftOpenValue={0}
            rightOpenValue={-150}
            previewRowKey={'0'}
            closeOnRowOpen={true}
            closeOnRowBeginSwipe={true}
            keyExtractor={(item) => item.id}
            previewOpenValue={-40}
            previewOpenDelay={3000}
          />
          <View style={styles.footer}>
            <Button title="Add Task" onPress={() => navigation.navigate('AddTaskScreen')} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    flexGrow: 1,
    padding: 20,
  },
  footer: {
    paddingHorizontal: 20,
  },
  loading: {
    marginVertical: 16,
    fontSize: 16,
    color: '#999',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loadingText: {
    marginLeft: 10,
    color: '#999',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#fff',
    height: 50,
    marginTop: 10,
  },
  item: {
    flex: 1,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowBack: {
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    height: 50,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
