import { Todo } from '@interfaces/todo';

export interface TodoListProps {
  todos: Todo[];
  onToggleServerAction(todoId: string, isDone: boolean): Promise<void>;
  onAddServerAction(formData: FormData): Promise<void>;
  onDeleteServerAction(todoId: string): Promise<void>;
}
