import { createSlice } from "@reduxjs/toolkit";

export const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: null,
  },
  reducers: {
    expenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const { expenses } = expensesSlice.actions;

export const selectExpenses = (state) => state.expenses.expenses;

export default expensesSlice.reducer;
