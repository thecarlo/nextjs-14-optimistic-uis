import { z } from 'zod';

export const createTodoValidationSchema = z
  .object({
    title: z
      .string()
      .min(3, { message: 'minimum of 3 characters required' })
      .max(75, { message: 'maximum of 75 characters allowed' }),
    isDone: z.boolean(),
  })
  .strict();
