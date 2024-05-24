import { CreateTodo } from '@interfaces/createTodo';
import { createTodoValidationSchema } from '@validate/schemas/createTodoValidationSchema';
import { SafeParseReturnType } from 'zod';

export const validateCreateTodo = (
  todo: CreateTodo,
): SafeParseReturnType<CreateTodo, CreateTodo> => {
  return createTodoValidationSchema.safeParse(todo);
};
