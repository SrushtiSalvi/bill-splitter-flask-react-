import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import expensesReducer from "../features/expensesSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    expenses: expensesReducer,
  },
});
