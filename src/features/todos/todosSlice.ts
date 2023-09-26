import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

import { Todo } from '../../types/todo';

const storedTodos = localStorage.getItem('todos');
const initialState: Todo[] = storedTodos
  ? JSON.parse(storedTodos)
  : [
      { id: '0', text: 'Jog around the park 3x', isCompleted: false },
      { id: '1', text: '10 minutes meditation', isCompleted: true },
      { id: '2', text: 'Read for 1 hour', isCompleted: false },
    ];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (text: string) => {
        return {
          payload: {
            id: nanoid(),
            text,
            isCompleted: false,
          },
        };
      },
    },
    todoDeleted: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
    todoToggled: (state, action: PayloadAction<string>) => {
      const todo = state.find((t) => t.id === action.payload)!;
      todo.isCompleted = !todo.isCompleted;
    },
    completedCleared: (state) => {
      return state.filter((todo) => !todo.isCompleted);
    },
  },
});

export const { todoAdded, todoDeleted, todoToggled, completedCleared } =
  todosSlice.actions;

export default todosSlice.reducer;
