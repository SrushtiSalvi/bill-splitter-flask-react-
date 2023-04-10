import React, { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { get_all_expenses } from "../api";
import ExpensesTable from "./ExpensesTable";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { expenses } from "../features/expensesSlice";

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
  const [totalAmount, setTotalAmount] = useState(0);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getExpenses = async () => {
    console.log("inside expenses");
    const res = await get_all_expenses();
    if (res.data.success && res.data.expenses !== null) {
      dispatch(
        expenses({
          expenses: res.data.expenses,
        })
      );
      // setExpenses(res.data.expenses);
      setTotalAmount(res.data.total_amount);
    } else {
      console.log(res.data.message);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  // return (
  //   <div>
  //     <h1 className="font-bold m-4 text-center text-xl">Your Expenses</h1>
  //     <div className="border p-2 flex justify-between">
  //       <div>
  //         <h1>Total Expenses (in Rs.)</h1>
  //         <span className="text-2xl font-bold text-red-500">{totalAmount}</span>
  //       </div>
  //       <button className="flex justify-center  p-2 space-x-2 items-center bg-blue-500 text-white rounded-xl">
  //         <span className="font-bold" onClick={handleOpen}>
  //           Add Expense
  //         </span>
  //         <IoAddOutline className="text-lg" />
  //       </button>

  //       <Modal
  //         open={open}
  //         onClose={handleClose}
  //         aria-labelledby="modal-modal-title"
  //         aria-describedby="modal-modal-description"
  //       >
  //         <Box sx={style}>
  //           <AddExpense
  //             setOpen={setOpen}
  //             setExpenses={setExpenses}
  //             expenses={expenses}
  //             setTotalAmount={setTotalAmount}
  //             totalAmount={totalAmount}
  //           />
  //         </Box>
  //       </Modal>
  //     </div>
  //     <div>
  //       <div>
  //         <ExpensesTable expenses={expenses} setExpenses={setExpenses} />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Expenses;
