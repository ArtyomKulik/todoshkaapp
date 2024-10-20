import { useEffect, useState } from 'react';
import type { TaskSubmitType, TaskType } from '../types/TaskTypes';
import taskService from '../services/tasksService';
import type {
  DeleteCompletedTasksHandlerType,
  TaskDeleteHandlerType,
  TaskStatusChangeHandlerType,
  TaskSubmitHandlerType,
} from '../types/TaskHandlerTypes';

export default function useTasks(): {
  tasks: TaskType[];
  taskSubmitHandler: TaskSubmitHandlerType;
  taskDeleteHandler: TaskDeleteHandlerType;
  taskStatusChangeHandler: TaskStatusChangeHandlerType;
  taskDeleteCompletedHandler: DeleteCompletedTasksHandlerType;
} {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    taskService
      .getTasks()
      .then(setTasks)
      .catch((error) => console.error('err:', error));
  }, []);

  const taskSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as unknown as TaskSubmitType;
    taskService
      .addTask(data)
      .then((newTask) => setTasks((prevTasks) => [newTask, ...prevTasks]))
      .catch((error) => console.error('err:', error));
    e.currentTarget.reset();
  };

  const taskDeleteHandler: TaskDeleteHandlerType = (id) => {
    taskService
      .deleteTask(id)
      .then(() => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)))
      .catch((error) => console.error('err:', error));
  };

  const taskDeleteCompletedHandler: DeleteCompletedTasksHandlerType = () => {
    taskService
      .deleteCompletedTasks()
      .then(() =>
        setTasks((prevTasks) => prevTasks.filter((task) => task.status !== 'completed')),
      )
      .catch((error) => console.error('err:', error));
  };

  const taskStatusChangeHandler: TaskStatusChangeHandlerType = (id, { status }) => {
    taskService
      .editTask(id, {
        status,
      })
      .then(() =>
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status,
                }
              : task,
          ),
        ),
      )
      .catch((error) => console.error('err:', error));
  };

  return {
    tasks,
    taskSubmitHandler,
    taskDeleteHandler,
    taskDeleteCompletedHandler,
    taskStatusChangeHandler,
  };
}
