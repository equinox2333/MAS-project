import React from 'react';
import dayjs from 'dayjs';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import { CheckBox, Icon, useTheme } from '@ui-kitten/components';

import { Priority } from '@/components/Priority';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { updateParentTask, updateSubTasks } from '@/utils';
import type { NavigationProp, TaskItem } from '@/types';

export interface TaskProps {
  data: TaskItem;
  indent: number;
}

export default function Task(props: TaskProps) {
  const { data, indent } = props;
  const theme = useTheme();
  const [taskList, setTaskList] = useLocalStorage<TaskItem[]>('taskList', {
    defaultValue: [],
  });
  const { id, title, startTime, priority, completed, subTasks, parentId } = data;
  const navigation = useNavigation<NavigationProp<'Tasks'>>();
  const [expanded, setExpanded] = React.useState(false);
  const rowRef = React.useRef<any>();

  const styles = StyleSheet.create({
    container: {
      marginTop: indent > 0 ? 0 : 10,
    },
    backTextWhite: {
      color: '#fff',
    },
    rowFront: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: indent * 24 + 12,
      backgroundColor: theme['background-basic-color-2'],
    },
    item: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    extra: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
      gap: 8,
    },
    right: {
      width: 40,
      height: 60,
      marginRight: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowBack: {
      height: 60,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
    },
    backRightBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      height: 60,
      width: 75,
    },
    backRightBtnLeft: {
      backgroundColor: theme['color-info-500'],
      right: 75,
    },
    backRightBtnRight: {
      backgroundColor: theme['color-danger-500'],
      right: 0,
    },
    icon: {
      width: 20,
      height: 20,
    },
  });

  const closeRow = () => {
    if (rowRef.current) {
      rowRef.current.closeRow();
    }
  };

  const handleDelete = () => {
    closeRow();
    const newList = taskList.filter((task) => task.id !== id && task.parentId !== id);
    updateParentTask(newList, parentId);
    setTaskList(newList);
  };

  const handleCompleted = () => {
    closeRow();
    const newList = [...taskList];
    // 修改当前节点的状态
    newList.find((task) => task.id === id).completed = !completed;
    updateSubTasks(newList, id, !completed);
    updateParentTask(newList, parentId);
    setTaskList(newList);
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
          <CheckBox style={{ height: 50, flex: 1 }} checked={completed} onChange={handleCompleted}>
            <View style={styles.item}>
              <View>
                <Text
                  style={[
                    completed ? { textDecorationLine: 'line-through' } : null,
                    { lineHeight: 22, color: theme['text-basic-color'] },
                  ]}
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
          ? subTasks?.map((subTask) => <Task key={subTask.id} data={subTask} indent={indent + 1} />)
          : null}
      </View>
    </>
  );
}
