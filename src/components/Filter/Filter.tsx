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
          <li
            className={classNames(
              filter === TFilter.All && styles['filter-active']
            )}
            onClick={() => handleFilterChanged(TFilter.All)}
          >
            All
          </li>
          <li
            className={classNames(
              filter === TFilter.Active && styles['filter-active']
            )}
            onClick={() => handleFilterChanged(TFilter.Active)}
          >
            Active
          </li>
          <li
            className={classNames(
              filter === TFilter.Completed && styles['filter-active']
            )}
            onClick={() => handleFilterChanged(TFilter.Completed)}
          >
            Completed
          </li>
        </ul>
        <button onClick={handleCompletedCleared}>Clear Completed</button>
      </div>
      <ul className={styles['filters-mobile']}>
        <li>All</li>
        <li>Active</li>
        <li>Completed</li>
      </ul>
    </>
  );
}
