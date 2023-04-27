import { createSlice } from "@reduxjs/toolkit";

export const expensescategoriesSlice = createSlice({
  name: "expenseCategoriesData",
  initialState: {
    expenseCategories: [
      { id: 1, name: "All", checked: false },
      { id: 2, name: "Food", checked: false },
      { id: 3, name: "Travel", checked: false },
      { id: 4, name: "Shopping", checked: false },
      { id: 5, name: "Entertainment", checked: false },
      { id: 6, name: "Health", checked: false },
      { id: 7, name: "Education", checked: false },
      { id: 8, name: "Others", checked: false },
    ],
  },
  reducers: {
    setExpenseCategoriesData: (state, action) => {
      // console.log("setExpenseCategoriesReducer >>>>>", action.payload);
      return action.payload;
    },
  },
});

export const { setExpenseCategoriesData } = expensescategoriesSlice.actions;

export const selectExpenseCategoriesData = (state) => {
  return state.expenseCategoriesData;
};

export default expensescategoriesSlice.reducer;
