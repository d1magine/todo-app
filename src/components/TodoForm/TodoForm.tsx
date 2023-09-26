import { useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { todoAdded } from '../../features/todos/todosSlice';

import styles from './TodoForm.module.scss';

export default function TodoForm() {
  const dispatch = useAppDispatch();

  const [todoText, setTodoText] = useState('');

  const handleTodoTextChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodoText(e.target.value);

  const handleTodoAdded = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && todoText.trim()) {
      dispatch(todoAdded(todoText));
      setTodoText('');
    }
  };

  return (
    <div className={styles['input-wrapper']}>
      <div></div>
      <input
        onKeyDown={handleTodoAdded}
        onChange={handleTodoTextChanged}
        value={todoText}
        type='text'
        placeholder='Create a new todo...'
      />
    </div>
  );
}
