import React from 'react';
import dayjs from 'dayjs';
import {
  DeviceEventEmitter,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { SwipeRow } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import { CheckBox, Icon, useTheme } from '@ui-kitten/components';

import { Priority } from '@/components/Priority';
import { getAllParentTasks, getAllSubTasks } from '@/utils';
import type { NavigationProp, TaskItem } from '@/types';
import { EventKey } from '@/constants/event';
import { deleteTasks, updateTasksCompleted } from '@/services/todo';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import useStyles from './styles';

export interface TaskProps {
  data: TaskItem;
  tasks: TaskItem[];
  indent: number;
}

const HEIGHT = 60;

export default function Task(props: TaskProps) {
  const { data, tasks, indent } = props;
  const theme = useTheme();
  const { id, title, startTime, priority, completed, subTasks, parentId } = data;
  const navigation = useNavigation<NavigationProp<'Tasks'>>();
  const [expanded, setExpanded] = useLocalStorage(id, {
    defaultValue: false,
  });
  const rowRef = React.useRef<any>();

  const styles = useStyles({ indent, height: HEIGHT });

  const refresh = () => {
    DeviceEventEmitter.emit(EventKey.RefreshTaskList);
  };

  const closeRow = () => {
    if (rowRef.current) {
      rowRef.current.closeRow();
    }
  };

  const handleDelete = async () => {
    closeRow();
    Toast.show({
      type: 'success',
      text1: 'Loading...',
      autoHide: false,
    });

    // 删除当前数据和它的子任务
    let deleteList = [data];
    deleteList = deleteList.concat(getAllSubTasks(tasks, id, !completed));

    // 删除以后需要更新父任务的状态
    const parentTasks = getAllParentTasks(tasks, parentId);

    await Promise.all([deleteTasks(deleteList), updateTasksCompleted(parentTasks)]);
    refresh();
  };

  const handleCompleted = async () => {
    try {
      Toast.show({
        type: 'success',
        text1: 'Loading...',
        autoHide: false,
      });
      closeRow();
      const currTask = { ...data, completed: !completed };
      const index = tasks.findIndex((item) => item.id === id);
      tasks.splice(index, 1, currTask);
      const subTasks = getAllSubTasks(tasks, id, !completed);
      const parentTasks = getAllParentTasks(tasks, parentId);
      await updateTasksCompleted([].concat(currTask).concat(subTasks).concat(parentTasks));
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    closeRow();
    navigation.navigate('AddTask', { task: data });
  };

  const handleAddSubTask = () => {
    navigation.navigate('AddTask', { parentTask: data, indent: indent + 1 });
  };

  const hasSubTasks = subTasks?.length > 0;

  return (
    <>
      {/* @ts-ignore */}
      <SwipeRow ref={rowRef} leftOpenValue={0} rightOpenValue={-150} style={styles.container}>
        <View style={styles.rowBack}>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => handleEdit()}
          >
            <Text style={styles.backTextWhite}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => handleDelete()}
          >
            <Text style={styles.backTextWhite}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowFront}>
          <View style={{ width: 25 }}>
            {hasSubTasks ? (
              <Icon
                onPress={() => setExpanded(!expanded)}
                name={expanded ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'}
                style={styles.icon}
                fill={theme['text-basic-color']}
              />
            ) : null}
          </View>
          <CheckBox
            style={{ height: HEIGHT, flex: 1 }}
            checked={completed}
            onChange={handleCompleted}
          >
            <View style={styles.item}>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[completed ? styles.completed : null, styles.taskTitle]}
                >
                  {title}
                </Text>
                <View style={styles.extra}>
                  {priority ? <Priority priority={priority} /> : null}
                  {startTime ? (
                    <Text style={{ color: theme['text-hint-color'] }}>
                      {dayjs(startTime).format('MMM D')}
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
          </CheckBox>
          {indent < 2 ? (
            <TouchableWithoutFeedback onPress={handleAddSubTask}>
              <View style={styles.right}>
                <Icon
                  name="plus-square-outline"
                  style={styles.icon}
                  fill={theme['text-basic-color']}
                />
              </View>
            </TouchableWithoutFeedback>
          ) : null}
        </View>
      </SwipeRow>
      <View>
        {expanded
          ? subTasks?.map((subTask) => (
              <Task key={subTask.id} tasks={tasks} data={subTask} indent={indent + 1} />
            ))
          : null}
      </View>
    </>
  );
}
