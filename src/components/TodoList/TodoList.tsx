import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../app/hooks';

import TodoItem from '../TodoItem/TodoItem';

import { Filter } from '../../types/filter';
import { Todo } from '../../types/todo';

import styles from './TodoList.module.scss';

export default function TodoList() {
  const todos = useAppSelector((state) => state.todos, shallowEqual);

  const filter = useAppSelector((state) => state.filter);
  let filteredTodos: Todo[] = [];

  switch (filter) {
    case Filter.Active:
      filteredTodos = todos.filter((todo) => !todo.isCompleted);
      break;

    case Filter.Completed:
      filteredTodos = todos.filter((todo) => todo.isCompleted);
      break;

    default:
      filteredTodos = todos;
      break;
  }

  return (
    <div className={styles['todos-list']}>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
