import type { TaskItem } from '@/types';

export const sortTasksByStartTime = (node: TaskItem) => {
  node.subTasks.sort(
    (a: TaskItem, b: TaskItem) =>
      (a.startTime || Number.POSITIVE_INFINITY) - (b.startTime || Number.POSITIVE_INFINITY),
  );
  for (const subTask of node.subTasks) {
    if (subTask.subTasks.length > 0) {
      sortTasksByStartTime(subTask);
    }
  }
};

export const mergeIntoTree = (arr: TaskItem[]): TaskItem[] => {
  const map = new Map();

  for (const item of arr) {
    map.set(item.id, { ...item, subTasks: [] });
  }

  const tree = [];

  for (const item of map.values()) {
    if (item.parentId && map.has(item.parentId)) {
      map.get(item.parentId).subTasks.push(item);
    } else {
      tree.push(item);
    }
  }

  for (const root of tree) {
    sortTasksByStartTime(root);
  }

  tree.sort(
    (a: TaskItem, b: TaskItem) =>
      (a.startTime || Number.POSITIVE_INFINITY) - (b.startTime || Number.POSITIVE_INFINITY),
  );

  return tree;
};

// 递归找它的子节点，修改成与父节点一样的状态
export const updateSubTasks = (tasks: TaskItem[], id: string, completed: boolean) => {
  tasks?.map((task) => {
    if (task.parentId === id) {
      task.completed = completed;
      updateSubTasks(tasks, task.id, completed);
    }
  });
};

// 递归找到修改所有父节点的数据，如果子节点都完成了，父节点也完成
export const updateParentTask = (tasks: TaskItem[], parentId: string) => {
  if (parentId) {
    const parentTask = tasks.find((item) => item.id === parentId);
    const subList = tasks.filter((item) => item.parentId === parentId);
    if (subList.length > 0) {
      parentTask.completed = subList.every((item) => item.completed);
    }
    updateParentTask(tasks, parentTask.parentId);
  }
};
