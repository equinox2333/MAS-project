import type { NavigationProp as ReactNavigationProp } from '@react-navigation/native';
import type { PriorityEnum } from '@/constants';

export interface TaskItem {
  parentId: string | null;
  id: string;
  title: string;
  description: string;
  priority: PriorityEnum;
  createTime: number;
  startTime: number;
  dueDate: number;
  completed: boolean;
  tags: string;
  subTasks?: TaskItem[];
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddTask: { task?: TaskItem; indent?: number; parentTask?: TaskItem };
  Tasks: undefined;
};

export type NavigationProp<T extends keyof RootStackParamList> = ReactNavigationProp<
  RootStackParamList,
  T
>;
