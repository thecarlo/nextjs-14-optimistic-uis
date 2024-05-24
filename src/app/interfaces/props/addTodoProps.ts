import { Todo } from '@interfaces/todo';

export interface AddTodoProps {
  handleOnAdd(formData: FormData): Promise<void>;
  todos: Todo[];
}
