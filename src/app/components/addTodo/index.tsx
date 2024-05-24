'use client';

import { useState } from 'react';

import toast from 'react-hot-toast';

import { AddTodoProps } from '@interfaces/props/addTodoProps';

const AddTodo: React.FC<AddTodoProps> = ({ handleOnAdd, todos }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputText || inputText.length < 3) {
      setInputText('');

      toast.error('Ensure task is at least 3 characters long');

      return;
    }

    const isDuplicateTask = todos.some((todo) => todo.title === inputText);

    if (isDuplicateTask) {
      setInputText('');

      toast.error('Task is already in the list');

      return;
    }

    setInputText('');

    const formData = new FormData();

    formData.append('input-todo', inputText);

    await handleOnAdd(formData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center w-full"
      >
        <div className="flex flex-grow">
          <input
            id="input-todo"
            name="input-todo"
            type="text"
            placeholder="Add a Task"
            className="flex-grow mr-2 p-2 border border-gray-300 rounded-md"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />

          <button
            type="submit"
            className="bg-todo-blue text-white rounded-md px-3 py-1"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTodo;
