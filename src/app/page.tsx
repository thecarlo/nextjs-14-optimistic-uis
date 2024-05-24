import Todos from './components/todos';

import '@fortawesome/fontawesome-svg-core/styles.css';

export default async function Home() {
  return (
    <main className="max-w-lg mx-auto mt-12">
      <h1 className="text-4xl font-bold text-todo-blue text-center mb-12">
        Todo List
      </h1>

      <Todos />
    </main>
  );
}
