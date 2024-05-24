'use server';

import { revalidateTag } from 'next/cache';

import { cacheKeys } from '@constants/cacheKeys';
import { todoModel } from '@functions/mongo/models/todosModel';
import { mongoConnect } from '@functions/mongo/mongoConnect';
import { Todo } from '@interfaces/todo';

export async function addTodo(formData: FormData): Promise<void> {
  try {
    await mongoConnect();

    const title = formData.get('input-todo') as string;

    if (!title) {
      return;
    }

    const todo: Todo = {
      title,
      isDone: false,
    };

    const result = await todoModel.create(todo);

    console.log(`  => added Todo. _id=${result._id}, title=${result.title}`);
  } catch (error: any) {
    throw error;
  } finally {
    revalidateTag(cacheKeys.todos);
  }
}
