import React, { useState } from "react";
import { toast } from "react-toastify";
import { add_expense } from "../api";
import { IoAddOutline } from "react-icons/io5";

const AddExpense = ({
  setOpen,
  expenses,
  setExpenses,
  totalAmount,
  setTotalAmount,
}) => {
  const categories = [
    "food",
    "clothing",
    "healthcare",
    "transport",
    "beauty",
    "essentials",
    "others",
  ];

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("other");

  const handleAddExpense = async () => {
    const res = await add_expense(title, amount, category);
    console.log(res);
    if (res.data.success) {
      setExpenses([...expenses, res.data.expense]);
      setTotalAmount(totalAmount + res.data.expense.amount);
      setOpen(false);
      toast(res.data.message);
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
              <option value={category} key={index}>
                {category}
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
