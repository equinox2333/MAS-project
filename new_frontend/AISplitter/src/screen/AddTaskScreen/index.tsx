import React from 'react';
import dayjs from 'dayjs';
import { View, DeviceEventEmitter } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { CheckBox, Datepicker, Input, Text } from '@ui-kitten/components';

import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { PriorityEnum } from '@/constants';
import type { NavigationProp, TaskItem } from '@/types';
import { getAllParentTasks } from '@/utils';
import { createTask, getTasks, updateTask, updateTasksCompleted } from '@/services/todo';
import { EventKey } from '@/constants/event';

import useStyles from './styles';

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
  const styles = useStyles();

  const [taskList, setTaskList] = React.useState<TaskItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState<TaskItem>(
    params?.task || ({ priority: PriorityEnum.Medium } as TaskItem),
  );
  const isEdit = React.useMemo(() => !!params?.task, [params]);
  const title = isEdit ? 'Edit Task' : parentTask ? 'Add Sub Task' : 'Add Task';

  const handleConfirm = (date: Date) => {
    setTask((prevTask) => ({ ...prevTask, startTime: dayjs(date).valueOf() }));
  };

  const handleChanged = (key: string, value: string) => {
    setTask((prevTask) => ({ parentId: parentTask?.id, ...prevTask, [key]: value }));
  };

  const init = React.useCallback(() => {
    getTasks().then((data) => {
      setTaskList(data);
    });
  }, []);

  React.useEffect(() => {
    init();
  }, [init]);

  const refresh = () => {
    DeviceEventEmitter.emit(EventKey.RefreshTaskList);
  };

  const handleAddTask = async () => {
    try {
      setLoading(true);
      const id = Date.now().toString();
      // update created task
      if (isEdit) {
        await updateTask(task);
        // console.log("edit\n",task);
      } else { // create new task
        // get the id of created task
        var cur_id = await createTask({
          parentId: parentTask?.id || null,
          ...task,
          id,
        });
        if (parentTask?.id) {
          const parentTasks = getAllParentTasks(taskList, parentTask.id);
          await updateTasksCompleted(parentTasks);
        }
        // console.log("create\n",task);
        // console.log("parenttask\n",parentTask);
        // console.log("task id\n",c);
        // await console.log("this task id\n",cur_id)
        // generate sub tasks
        await fetch("https://nikitacrispe01.pythonanywhere.com/generate_study_stuff", {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            } ,
            body: JSON.stringify({'title':task.title,
                                   'description': task.description }) 
          })
          .then(response => {
            // Check if the response is successful
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Parse the response as JSON
            return response.json();
          })
          .then(async data => {
            // Log the fetched data to the console
            // console.log(data);
            // console.log(data.tasks);
            // TODO:based on the returned result, generate subtasks and append them
            var all_subtask = await data.tasks;
            console.log(all_subtask[0]);
            await createTask({
              ...all_subtask[0],
              parentId: cur_id,
              id,
            });
            // await all_subtask.foreach(async function(subtask) {
            //   console.log(subtask)
            //   try {createTask({
            //       ...task,
            //       parentId: cur_id,
            //       id,
            //     });
            //   } catch(error) {
            //     console.log(error);
            //   }

            })
            // console.log("sub task\n",nextid)
            
          // })


        
      }
      // await navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    } finally {
      navigation.goBack();
      refresh();
      setLoading(false);
    }
  };

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
        <Button loading={loading} disabled={!task.title?.trim()} onPress={handleAddTask}>
          {isEdit ? 'Save' : parentTask ? 'Add Sub Task' : 'Add Task'}
        </Button>
      </Layout.Footer>
    </Layout>
  );
}
