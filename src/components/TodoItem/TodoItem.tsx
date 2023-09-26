import classnames from 'classnames';

import { useAppDispatch } from '../../app/hooks';
import { todoDeleted, todoToggled } from '../../features/todos/todosSlice';

import { Todo } from '../../types/todo';

import styles from './TodoItem.module.scss';
import crossIcon from '../../assets/images/icon-cross.svg';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useAppDispatch();

  const handleTodoDeleted = () => dispatch(todoDeleted(todo.id));

  const handleTodoToggled = () => dispatch(todoToggled(todo.id));

  return (
    <article
      className={classnames(
        styles.todo,
        todo?.isCompleted && styles['todo-completed']
      )}
    >
      <div onClick={handleTodoToggled}></div>
      <p onClick={handleTodoToggled}>{todo?.text}</p>
      <button onClick={handleTodoDeleted}>
        <img src={crossIcon} alt='' />
      </button>
    </article>
  );
}
