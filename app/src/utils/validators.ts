import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number(),
  text: z.string(),
  status: z.union([z.literal('active'), z.literal('completed')]),
});

export const TasksSchema = z.array(TaskSchema);
