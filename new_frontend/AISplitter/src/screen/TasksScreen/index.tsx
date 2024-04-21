import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-toast-message';

import Empty from '@/components/Empty';
import Layout from '@/components/Layout';
import Task from '@/components/Task';

import { mergeIntoTree } from '@/utils';
import { getTasks } from '@/services/todo';
import type { TaskItem } from '@/types';
import { EventKey } from '@/constants/event';

export default function TasksScreen() {
  const [loading, setLoading] = React.useState(true);
  const [taskList, setTaskList] = React.useState<TaskItem[]>([]);
  const dataSource = mergeIntoTree(taskList);

  const init = React.useCallback(() => {
    setLoading(true);
    getTasks().then((data) => {
      setTaskList(data);
      setLoading(false);
      Toast.hide();
    });
  }, []);

  const refresh = React.useCallback(() => {
    getTasks().then((data) => {
      setTaskList(data);
      Toast.hide();
      // console.log("all tasks\n",data)
    });
  }, []);

  React.useEffect(() => {
    init();

    const listener = DeviceEventEmitter.addListener(EventKey.RefreshTaskList, refresh);

    return listener.remove;
  }, [init, refresh]);

  return (
    <Layout
      edges={{
        top: 'additive',
      }}
    >
      <Layout.Header title="Tasks" />
      <Layout.Content loading={loading} style={{ paddingHorizontal: 0 }}>
        {dataSource.length === 0 ? (
          <Empty />
        ) : (
          dataSource.map((task) => <Task key={task.id} tasks={taskList} data={task} indent={0} />)
        )}
      </Layout.Content>
    </Layout>
  );
}
