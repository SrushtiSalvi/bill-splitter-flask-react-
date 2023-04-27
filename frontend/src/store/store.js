import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import expensesReducer from "../features/expensesSlice";
import expensesCategoriesReducer from "../features/expensesCategoriesSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  expenseData: expensesReducer,
  expenseCategoriesData: expensesCategoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

// export default configureStore({
//   reducer: {
//     user: userReducer,
//     expenses: expensesReducer,
//   },
// });
