'use server';

import { revalidateTag } from 'next/cache';

import { cacheKeys } from '@constants/cacheKeys';
import { todoModel } from '@functions/mongo/models/todosModel';
import { mongoConnect } from '@functions/mongo/mongoConnect';
import { UpdateTodoPayload } from '@interfaces/updateTodoPayload';

export async function toggleTodo(todoId: string, isDone: boolean) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 700));


    await mongoConnect();

    const payload: UpdateTodoPayload = { isDone };

    const result = await todoModel.findByIdAndUpdate(todoId, payload, {
      new: true,
      runValidators: true,
    });

    console.log(
      `  => toggled Todo. _id=${result._id}, isDone=${result.isDone}`,
    );
  } catch (error) {
    console.error('toggleTodo error', error);

    throw error;
  } finally {
    revalidateTag(cacheKeys.todos);
  }
}
