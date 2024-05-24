import mongoose, { model, Schema } from 'mongoose';

import { Todo } from '@interfaces/todo';

const todoSchema: Schema = new Schema<Todo>(
  {
    title: { type: String, required: true, unique: true },
    isDone: { type: Boolean, required: true },
    createdAt: { type: Date, required: false, default: Date.now },
  },
  { collection: 'todo' },
)
  .index({ title: 1 })
  .index({ createdAt: 1 });

export const todoModel =
  mongoose.models.todo || model<Todo>('todo', todoSchema);
