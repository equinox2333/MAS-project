import type { NavigationProp as ReactNavigationProp } from '@react-navigation/native';
import type { PriorityEnum } from '@/constants';

export interface TaskItem {
  parentId?: string;
  id: string;
  title: string;
  description: string;
  priority: PriorityEnum;
  createTime: number;
  startTime: string;
  dueDate: string;
  completed: boolean;
  tags: string;
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddTask: { task: TaskItem };
  TaskList: undefined;
};

export type NavigationProp<T extends keyof RootStackParamList> = ReactNavigationProp<
  RootStackParamList,
  T
>;
