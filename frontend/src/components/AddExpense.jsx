import React, { useState } from "react";
import { toast } from "react-toastify";
import { add_expense, get_all_expenses } from "../api";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import exp, { setExpenseData } from "../features/expensesSlice";
import { selectExpenseData } from "../features/expensesSlice";
import { selectExpenseCategoriesData } from "../features/expensesCategoriesSlice";

const AddExpense = ({ setOpen }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("other");
  const dispatch = useDispatch();
  const expenseData = useSelector(selectExpenseData);
  const expenseCategoriesData = useSelector(selectExpenseCategoriesData);
  const categories = expenseCategoriesData.expenseCategories;

  const handleAddExpense = async () => {
    const res = await add_expense(title, amount, category);
    if (res.data.success) {
      get_all_expenses()
        .then((res) => {
          dispatch(
            setExpenseData({
              expenses: res.data.expenses,
              totalAmount: res.data.total_amount,
            })
          );
          setOpen(false);
          toast(res.data.message);
        })
        .catch((err) => {
          toast(err.message);
        });
    } else {
      toast(res.data.message);
    }
  };
  return (
    <>
      <h1 className="text-lg pb-4">Add Expense</h1>
      <form>
        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-800">
            Title
          </label>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-800">
            Category
          </label>
          <select
            required
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option value="">--Please choose an option--</option>
            {categories.map((category, index) => (
              <option value={category.name} key={index}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-800">
            Amount
          </label>
          <input
            required
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <button
          type="button"
          onClick={handleAddExpense}
          className="flex p-2 space-x-2 items-center bg-blue-600 text-white rounded-xl"
        >
          <span className="font-semibold">Add</span>
          <IoAddOutline className="text-lg" />
        </button>
      </form>
    </>
  );
};

export default AddExpense;
