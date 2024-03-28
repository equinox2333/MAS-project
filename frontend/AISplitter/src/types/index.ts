import type { PriorityEnum } from '@/constants';
import type { NavigationProp as ReactNavigationProp } from '@react-navigation/native';

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
  LoginScreen: undefined;
  RegisterScreen: undefined;
  AddTaskScreen: { task: TaskItem };
  TaskListScreen: undefined;
};

export type NavigationProp<T extends keyof RootStackParamList> = ReactNavigationProp<
  RootStackParamList,
  T
>;
