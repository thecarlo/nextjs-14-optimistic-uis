'use client';

import { startTransition, useOptimistic, useState } from 'react';

import {
  faCircle,
  faCircleCheck,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';

import AddTodo from '@components/addTodo';
import { TodoListProps } from '@interfaces/props/todoListProps';
import { Todo } from '@interfaces/todo';

import '@fortawesome/fontawesome-svg-core/styles.css';

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleServerAction,
  onAddServerAction,
  onDeleteServerAction,
}) => {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic<Todo[]>(todos);

  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const onToggleClientHandler = async (
    id: string | undefined,
    isDone: boolean,
  ) => {
    try {
      if (!id) return;

      const updatedTodos = optimisticTodos.map((todo) =>
        todo._id === id ? { ...todo, isDone: !isDone } : todo,
      );

      startTransition(() => {
        setOptimisticTodos(updatedTodos);
      });

      await onToggleServerAction(id, !isDone);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onAddClientHandler = async (formData: FormData): Promise<void> => {
    try {
      const title = formData.get('input-todo') as string;

      if (!title) {
        throw new Error('Please enter a task');
      }

      if (title.length < 3) {
        throw new Error(
          'Please ensure that the task is at least 3 characters long',
        );
      }

      const hasDuplicateTitle = todos.some((todo) => todo.title === title);

      if (hasDuplicateTitle) {
        throw new Error(`Duplicate task: '${title}' already exists`);
      }

      const tempId = 'temp-id-' + Date.now();

      const tempTodo: Todo = {
        _id: tempId,
        title,
        isDone: false,
      };

      setLoadingStates({ ...loadingStates, [tempId]: true });

      startTransition(() => {
        setOptimisticTodos((prevTodos) => [tempTodo, ...prevTodos]);
      });

      await onAddServerAction(formData);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onDeleteClientHandler = async (id?: string) => {
    try {
      if (!id) return;

      const filteredTodos = optimisticTodos.filter((todo) => todo._id !== id);

      startTransition(() => {
        setOptimisticTodos(filteredTodos);
      });

      await onDeleteServerAction(id);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <AddTodo handleOnAdd={onAddClientHandler} todos={optimisticTodos} />

      <ul className="mt-10">
        {optimisticTodos.map((todo) => {
          const toggleIcon = todo.isDone ? faCircleCheck : faCircle;

          const toggleTitle = todo.isDone ? 'Mark as undone' : 'Mark as done';

          const isOptimisticTodo = loadingStates[todo._id || ''];

          return (
            <li
              id={`${todo._id}`}
              className="list-group-item d-flex justify-content-between align-items-center bg-todo-blue border-blue-800 border-t-0 border-b border-solid text-white list-none my-0 mx-0 px-4 py-2 first:rounded-t-md last:rounded-b-md last:border-b-0"
              key={`li-${todo._id}`}
            >
              <div>{todo.title}</div>

              {!isOptimisticTodo && (
                <div id="todo-icons" className="flex justify-end items-center">
                  <FontAwesomeIcon
                    titleId={`toggle-icon-${todo._id}`}
                    key={`toggle-icon-${todo._id}`}
                    icon={toggleIcon}
                    onClick={async () =>
                      await onToggleClientHandler(todo._id, todo.isDone)
                    }
                    title={toggleTitle}
                    className={`cursor-pointer pr-4`}
                  />

                  <FontAwesomeIcon
                    titleId={`del-icon-${todo._id}`}
                    key={`del-icon-${todo._id}`}
                    icon={faTrashCan}
                    onClick={async () => await onDeleteClientHandler(todo._id)}
                    title="Delete"
                    className="cursor-pointer"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
