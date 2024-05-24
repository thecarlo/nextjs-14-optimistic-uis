import { Todo } from './todo';

export type CreateTodo = Omit<Todo, '_id' | 'createdAt'>;
