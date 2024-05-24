'use server';

import TodoList from '@components/todoList';
import { addTodo } from '@serverActions/addTodo';
import { deleteTodo } from '@serverActions/deleteTodo';
import { toggleTodo } from '@serverActions/toggleTodo';
import { getTodos } from '@services/todos/getTodos';

export default async function Todos() {
  const todos = await getTodos();

  return (
    <div>
      <TodoList
        todos={todos}
        onToggleServerAction={toggleTodo}
        onAddServerAction={addTodo}
        onDeleteServerAction={deleteTodo}
      />
    </div>
  );
}
