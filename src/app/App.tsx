import Header from '../components/Header/Header';
import TodoForm from '../components/TodoForm/TodoForm';
import TodoList from '../components/TodoList/TodoList';
import Filter from '../components/Filter/Filter';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <TodoForm />
      <TodoList />
      <Filter />
    </div>
  );
}

export default App;
