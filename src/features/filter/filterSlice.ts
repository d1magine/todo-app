import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Filter } from '../../types/filter';

const initialState = Filter.All;

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChanged: (_state, action: PayloadAction<Filter>) => {
      return action.payload;
    },
  },
});

export const { filterChanged } = filterSlice.actions;

export default filterSlice.reducer;
