'use server';

import { revalidateTag } from 'next/cache';

import { cacheKeys } from '@constants/cacheKeys';
import { todoModel } from '@functions/mongo/models/todosModel';
import { mongoConnect } from '@functions/mongo/mongoConnect';

export async function deleteTodo(todoId: string) {
  await mongoConnect();

  await todoModel.findByIdAndDelete(todoId);

  revalidateTag(cacheKeys.todos);
}
