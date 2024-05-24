import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { cacheKeys } from '@constants/cacheKeys';
import { todoModel } from '@functions/mongo/models/todosModel';
import { mongoConnect } from '@functions/mongo/mongoConnect';
import { Todo } from '@interfaces/todo';

export const GET = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));

    await mongoConnect();

    const todos: Todo[] = await todoModel
      .find(
        {},
        {
          title: 1,
          isDone: 1,
          createdAt: 1,
        },
      )
      .sort({ createdAt: -1 })
      .exec();

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  } finally {
    revalidateTag(cacheKeys.todos);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));

    await mongoConnect();

    const formData = await request.formData();

    const title = formData.get('input-todo') as string;

    if (!title || title.length < 3) {
      return NextResponse.json({ message: 'Invalid title' }, { status: 400 });
    }

    const newTodo = new todoModel({
      title,
      isDone: false,
    });

    const result = await newTodo.save();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  } finally {
    revalidateTag(cacheKeys.todos);
  }
};
