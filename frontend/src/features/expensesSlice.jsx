import { createSlice } from "@reduxjs/toolkit";

export const expensesSlice = createSlice({
  name: "expenseData",
  initialState: {
    expenses: [],
    totalAmount: 0,
    monthlyBudget: 0,
    yearlyBudget: 0,
  },
  reducers: {
    setExpenseData: (state, action) => {
      // console.log("setExpenseReducer >>>>>", action.payload);
      return action.payload;
    },
    setExpenses: (state, action) => {
      // console.log("setExpensesReducer >>>>>", action.payload);
      return { ...state, expenses: action.payload };
    },
    setTotalAmount: (state, action) => {
      // console.log("setAMountReducer >>>>>", action.payload);
      return { ...state, totalAmount: action.payload };
    },
    setMonthlyBudget: (state, action) => {
      console.log("setMonthlyBudgetReducer >>>>>", action.payload);
      return { ...state, monthlyBudget: action.payload };
    },
    setYearlyBudget: (state, action) => {
      console.log("setYearlyBudgetReducer >>>>>", action.payload);
      return { ...state, yearlyBudget: action.payload };
    },
  },
});

export const {
  setExpenseData,
  setExpenses,
  setTotalAmount,
  setMonthlyBudget,
  setYearlyBudget,
} = expensesSlice.actions;

export const selectExpenseData = (state) => {
  // console.log("state>>>>>>>>>>", state);
  return state.expenseData;
};

export default expensesSlice.reducer;
