import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { cacheKeys } from '@constants/cacheKeys';
import { todoModel } from '@functions/mongo/models/todosModel';
import { mongoConnect } from '@functions/mongo/mongoConnect';
import { UpdateTodoPayload } from '@interfaces/updateTodoPayload';

export const DELETE = async (request: NextRequest) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const todoId = request.nextUrl.pathname.split('/').pop();

    await mongoConnect();

    const deletedTodo = await todoModel.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  } finally {
    revalidateTag(cacheKeys.todos);
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const todoId = request.nextUrl.pathname.split('/').pop();

    const body: UpdateTodoPayload = await request.json();

    await mongoConnect();

    await todoModel.findByIdAndUpdate(todoId, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
  } finally {
    revalidateTag(cacheKeys.todos);
  }
};
