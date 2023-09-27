import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { completedCleared } from '../../features/todos/todosSlice';
import { filterChanged } from '../../features/filter/filterSlice';

import { Filter as TFilter } from '../../types/filter';

import styles from './Filter.module.scss';

export default function Filter() {
  const todosLeft = useAppSelector(
    (state) => state.todos.filter((todo) => !todo.isCompleted).length
  );

  const filter = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();

  const handleCompletedCleared = () => dispatch(completedCleared());

  const handleFilterChanged = (filter: TFilter) =>
    dispatch(filterChanged(filter));

  return (
    <>
      <div className={styles['filters-wrapper']}>
        <span>{todosLeft} items left</span>
        <ul>
          {Object.values(TFilter).map((f) => (
            <li
              key={f}
              className={classNames(filter === f && styles['filter-active'])}
              onClick={() => handleFilterChanged(f)}
            >
              {f}
            </li>
          ))}
        </ul>
        <button onClick={handleCompletedCleared}>Clear Completed</button>
      </div>
      <ul className={styles['filters-mobile']}>
        {Object.values(TFilter).map((f) => (
          <li
            key={f}
            className={classNames(filter === f && styles['filter-active'])}
            onClick={() => handleFilterChanged(f)}
          >
            {f}
          </li>
        ))}
      </ul>
    </>
  );
}
