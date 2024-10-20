import type { z } from 'zod';
import type { TaskSchema } from '../utils/validators';

export type TaskType = z.infer<typeof TaskSchema>;

export type TaskSubmitType = Omit<TaskType, 'id'>;

export type TaskEditType = Pick<TaskType, 'status'>;

export type TaskApiResponse = TaskType[];
