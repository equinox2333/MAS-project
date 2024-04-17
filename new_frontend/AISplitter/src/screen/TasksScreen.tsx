import React from 'react';

import Empty from '@/components/Empty';
import Layout from '@/components/Layout';
import Task from '@/components/Task';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { TaskItem } from '@/types';
import { mergeIntoTree } from '@/utils';

export default function TasksScreen() {
  const [taskList] = useLocalStorage<TaskItem[]>('taskList', {
    defaultValue: [],
  });
  const dataSource = mergeIntoTree(taskList);

  return (
    <Layout>
      <Layout.Header title="Tasks" />
      <Layout.Content style={{ paddingHorizontal: 0 }}>
        {dataSource.length === 0 ? (
          <Empty />
        ) : (
          dataSource.map((task) => <Task key={task.id} data={task} indent={0} />)
        )}
      </Layout.Content>
    </Layout>
  );
}
