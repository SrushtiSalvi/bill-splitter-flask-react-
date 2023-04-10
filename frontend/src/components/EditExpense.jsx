import React, { useState } from "react";
import { toast } from "react-toastify";
import { update_expense } from "../api";

const EditExpense = ({ setEditModalOpen, data }) => {
  const [title, setTitle] = useState(data.title);
  const [amount, setAmount] = useState(data.amount);
  const handleEditExpense = async () => {
    const res = await update_expense(data._id, title, amount);
    if (res.data.success) {
      setEditModalOpen(false);
      toast(res.data.message);
    } else {
      toast(res.data.message);
    }
  };
  return (
    <>
      <h1 className="text-lg pb-4">Update Expense</h1>
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
            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
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
            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <button
          type="button"
          onClick={handleEditExpense}
          className="flex p-2 space-x-2 items-center bg-blue-600 text-white rounded-xl"
        >
          <span className="font-semibold">Update</span>
        </button>
      </form>
    </>
  );
};

export default EditExpense;
