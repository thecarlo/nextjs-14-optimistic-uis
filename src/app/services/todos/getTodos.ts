import { cacheKeys } from '@constants/cacheKeys';
import { ENV_VARS } from '@functions/envVars';
import { Todo } from '@interfaces/todo';

export const getTodos = async (): Promise<Todo[]> => {
  try {
    if (ENV_VARS.nodeEnv === 'production' && ENV_VARS.isBuildMock) {
      return [{ _id: '1', title: 'foo todo', isDone: false }];
    }

    const { baseUrl } = ENV_VARS;

    const response = await fetch(`${baseUrl}/api/todos`, {
      next: { tags: [cacheKeys.todos] },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }

    const todos = await response.json();

    return todos;
  } catch (error) {
    console.error('Error fetching todos:', error);

    return [];
  }
};
