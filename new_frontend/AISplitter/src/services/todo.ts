import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

import { auth, db } from '@/config/firebase';
import { DB } from '@/constants/db';
import type { TaskItem } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getTasks(): Promise<TaskItem[]> {
  const queryRef = query(collection(db, DB.TASKS), where('userId', '==', auth.currentUser.uid));

  const querySnapshot = await getDocs(queryRef);
  const list = querySnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      }) as TaskItem,
  );

  return list;
}

// export async function createTask(task: TaskItem): Promise<void> {
//   try {
//     await addDoc(collection(db, DB.TASKS), {
//       ...task,
//       parentId: task.parentId || null,
//       userId: auth.currentUser.uid,
//     });
//   } catch (error) {
//     console.error(error.message);
//   }
// }
export async function createTask(task: TaskItem): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, DB.TASKS), {
      ...task,
      parentId: task.parentId || null,
      userId: auth.currentUser.uid,
      // id: task.id
    });
    return docRef.id
  } catch (error) {
    console.error(error.message);
  }
}

export async function updateTask(task: Omit<TaskItem, 'subTasks'>): Promise<void> {
  await updateDoc(doc(db, DB.TASKS, task.id), task);
}

export async function deleteTasks(tasks: TaskItem[]): Promise<void> {
  const batch = writeBatch(db);
  for (const task of tasks) {
    // delete storage key
    AsyncStorage.removeItem(task.id);
    const tasksRef = doc(db, DB.TASKS, task.id);
    batch.delete(tasksRef);
  }
  await batch.commit();
}

export async function updateTasksCompleted(tasks: TaskItem[]): Promise<void> {
  const batch = writeBatch(db);
  for (const task of tasks) {
    const tasksRef = doc(db, DB.TASKS, task.id);
    batch.update(tasksRef, { completed: task.completed });
  }
  await batch.commit();
}
