import React from 'react';
import dayjs from 'dayjs';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckBox, Datepicker, Input, Text, useTheme } from '@ui-kitten/components';

import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { PriorityEnum } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { NavigationProp, TaskItem } from '@/types';
import { updateParentTask } from '@/utils';

interface Route {
  params: {
    task?: TaskItem;
    indent?: number;
    parentTask?: TaskItem;
  };
}

interface Props {
  route: Route;
}

export default function AddTaskScreen(props: Props) {
  const { params } = props.route;
  const { parentTask } = params || {};
  const navigation = useNavigation<NavigationProp<'AddTask'>>();
  const theme = useTheme();
  const [taskList, setTaskList] = useLocalStorage<TaskItem[]>('taskList', {
    defaultValue: [],
  });
  const [task, setTask] = React.useState<TaskItem>(
    params?.task || ({ priority: PriorityEnum.Medium } as TaskItem),
  );
  const isEdit = React.useMemo(() => !!params?.task, [params]);

  const handleConfirm = (date: Date) => {
    setTask((prevTask) => ({ ...prevTask, startTime: dayjs(date).valueOf() }));
  };

  const handleChanged = (key: string, value: string) => {
    setTask((prevTask) => ({ parentId: parentTask?.id, ...prevTask, [key]: value }));
  };

  const handleAddTask = async () => {
    const id = Date.now().toString();
    if (isEdit) {
      const newList = taskList.map((item) => (item.id === task.id ? task : item));
      setTaskList(newList);
    } else {
      const newList = [...taskList, { parentId: parentTask?.id, ...task, id, completed: false }];
      if (parentTask?.id) {
        updateParentTask(newList, parentTask?.id);
      }
      setTaskList(newList);
    }
    try {
      // TODO: display output
      // console.log(task.description)
      // TODO: fetch
      var url = "https://nikitacrispe01.pythonanywhere.com/generate_study_plan/" + task.title +","+task.description

      fetch(url, { 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              }  
            })
            .then(response => {
              // Check if the response is successful
              // console.log("response\n",response)
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              // Parse the response as JSON
              return response.json();
            })
            .then(data => {
              // Log the fetched data to the console
              console.log(data);
              // slice tasks into array
              
            })

    } catch (error) {
      console.log(error)
    } finally {
      navigation.goBack();
    }
    
    
  };

  const styles = StyleSheet.create({
    input: {
      marginBottom: 20,
    },
    label: {
      fontSize: 12,
      fontWeight: '900',
      color: theme['text-hint-color'],
      marginBottom: 5,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: 10,
      marginBottom: 20,
    },
    checkBox: {
      marginVertical: 10,
    },
    inputTextStyle: {
      minHeight: 64,
    },
  });

  const title = isEdit ? 'Edit Task' : parentTask ? 'Add Sub Task' : 'Add Task';

  return (
    <Layout>
      <Layout.Header showBack title={title} />
      <Layout.Content>
        {parentTask ? (
          <Text category="h6" style={{ marginBottom: 30, textAlign: 'center' }}>
            {parentTask.title}
          </Text>
        ) : null}

        <Input
          label="Task Title"
          style={styles.input}
          placeholder="Please input task title"
          value={task.title}
          onChangeText={(value) => handleChanged('title', value)}
        />

        <Datepicker
          label="Date"
          style={styles.input}
          placeholder="Please select date"
          date={task.startTime ? new Date(task.startTime) : undefined}
          onSelect={handleConfirm}
          min={dayjs().subtract(10, 'year').toDate()}
          max={dayjs().add(10, 'year').toDate()}
        />

        <Input
          label="Tags"
          style={styles.input}
          placeholder='Please input tags, separated by ","'
          value={task.tags}
          onChangeText={(value) => handleChanged('tags', value)}
        />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.container}>
          {Object.keys(PriorityEnum).map((option: PriorityEnum) => (
            <CheckBox
              key={option}
              style={styles.checkBox}
              checked={task.priority === option}
              onChange={() => handleChanged('priority', option)}
            >
              {option}
            </CheckBox>
          ))}
        </View>

        <Input
          label="Description"
          multiline={true}
          textStyle={styles.inputTextStyle}
          style={styles.input}
          placeholder="Please input description"
          value={task.description}
          onChangeText={(value) => handleChanged('description', value)}
        />
      </Layout.Content>
      <Layout.Footer>
        <Button disabled={!task.title?.trim()} onPress={handleAddTask}>
          {isEdit ? 'Save' : parentTask ? 'Add Sub Task' : 'Add Task'}
        </Button>
      </Layout.Footer>
    </Layout>
  );
}
