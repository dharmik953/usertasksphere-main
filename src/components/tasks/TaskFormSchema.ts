
import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string()
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(100, { message: 'Title must not exceed 100 characters' }),
  description: z.string()
    .max(500, { message: 'Description must not exceed 500 characters' })
    .optional(),
  dueDate: z.date().optional(),
  dueTime: z.string().optional(),
  reminderTime: z.string().optional(),
  urgency: z.string().optional(),
  category: z.string().optional(),
  notes: z.string().max(1000, { message: 'Notes must not exceed 1000 characters' }).optional(),
  pinned: z.boolean().default(false).optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
