import { updateTask } from '@/services/todo';
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

export const getAllSubTasks = (tasks: TaskItem[], id: string, completed: boolean) => {
  let result: TaskItem[] = [];
  for (const task of tasks) {
    if (task.parentId === id) {
      result.push({ ...task, completed });
      result = result.concat(getAllSubTasks(tasks, task.id, completed));
    }
  }
  return result;
};

export const getAllParentTasks = (tasks: TaskItem[], parentId: string) => {
  let result: TaskItem[] = [];
  if (parentId) {
    const parentTask = tasks.find((item) => item.id === parentId);
    const subList = tasks.filter((item) => item.parentId === parentId);
    if (subList.length > 0) {
      result.push({ ...parentTask, completed: subList.every((item) => item.completed) });
    }
    if (parentTask) {
      result = result.concat(getAllParentTasks(tasks, parentTask.parentId));
    }
  }
  return result;
};
