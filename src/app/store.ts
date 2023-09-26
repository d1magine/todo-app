import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';

import todosReducer from '../features/todos/todosSlice';
import filterReducer from '../features/filter/filterSlice';
import {
  todoAdded,
  todoDeleted,
  todoToggled,
  completedCleared,
} from '../features/todos/todosSlice';

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(todoAdded, todoDeleted, todoToggled, completedCleared),
  effect: (_action, listenerApi) => {
    localStorage.setItem(
      'todos',
      JSON.stringify((listenerApi.getState() as RootState).todos)
    );
  },
});

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
