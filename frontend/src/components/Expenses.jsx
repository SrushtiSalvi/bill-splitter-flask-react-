import React, { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { get_all_expenses } from "../api";
import ExpensesTable from "./ExpensesTable";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import exp, {
  setExpenseData,
  selectExpenseData,
} from "../features/expensesSlice";

import Modal from "@mui/material/Modal";
import AddExpense from "./AddExpense";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 10,
  p: 4,
};

const Expenses = ({ user }) => {
  const dispatch = useDispatch();
  // const [expenses, setExpenses] = useState([]);
  // const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const expenseData = useSelector(selectExpenseData);
  const { expenses, totalAmount } = expenseData;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getExpenses = async () => {
    const res = await get_all_expenses();
    console.log(res);
    if (res.data.success && res.data.expenses !== null) {
      dispatch(
        setExpenseData({
          expenses: res.data.expenses,
          totalAmount: res.data.total_amount,
          monthlyBudget: expenseData.monthlyBudget,
          yearlyBudget: expenseData.yearlyBudget,
        })
      );
      // setExpenses(res.data.expenses);
    } else {
      console.log(res.data.message);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div>
      <h1 className="font-bold m-3  text-xl">Your Expenses</h1>
      <div className="border p-2 flex justify-between">
        <div>
          <h1>Total Expenses (in Rs.)</h1>
          <span className="text-2xl font-bold text-red-500">{totalAmount}</span>
        </div>
        <button className="flex justify-center  p-2 space-x-2 items-center bg-blue-600 text-white rounded-xl">
          <span className="font-bold" onClick={handleOpen}>
            Add Expense
          </span>
          <IoAddOutline className="text-xl text-white" />
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddExpense setOpen={setOpen} />
          </Box>
        </Modal>
      </div>
      <div>
        <div>
          <ExpensesTable />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
