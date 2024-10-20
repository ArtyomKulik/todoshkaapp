import type { TaskEditType, TaskType } from './TaskTypes';

export type TaskSubmitHandlerType = (e: React.FormEvent<HTMLFormElement>) => void;
export type TaskDeleteHandlerType = (id: TaskType['id']) => void;
export type TaskStatusChangeHandlerType = (
  id: TaskType['id'],
  { status }: TaskEditType,
) => void;
export type DeleteCompletedTasksHandlerType = () => void;
