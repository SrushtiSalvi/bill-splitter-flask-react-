import React, { useState } from "react";
import { toast } from "react-toastify";

import { AiOutlineEdit } from "react-icons/ai";
import { set_monthly_budget } from "../api";
import { useDispatch, useSelector } from "react-redux";
import {
  setMonthlyBudget,
  selectExpenseData,
  setExpenseData,
} from "../features/expensesSlice";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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

const Budget = () => {
  const expenseData = useSelector(selectExpenseData);

  const [monthlybudget, setmonthlybudget] = useState(0);
  const [yearlyBudget, setYearlyBudget] = useState(0);
  const [openMonthlyBudget, setOpenMonthlyBudget] = useState(false);
  const [openYearlyBudget, setOpenYearlyBudget] = useState(false);

  const dispatch = useDispatch();

  const handleMonthlyBudget = async (e) => {
    e.preventDefault();
    const res = await set_monthly_budget(monthlybudget);
    if (res.data.success) {
      setOpenMonthlyBudget(false);
      dispatch(setMonthlyBudget(res.data.monthlyBudget));
    } else {
      toast(res.data.message, { type: "error" });
    }
  };

  return (
    <div className="p-4">
      <div className="text-sm font-semibold text-black border  px-2 py-1">
        <div className="flex justify-center align-middle">
          <p>Your Monthly Budget</p>
          <button onClick={() => setOpenMonthlyBudget(true)}>
            <AiOutlineEdit className="inline-block ml-2 text-base" />
          </button>
          <Modal
            open={openMonthlyBudget}
            onClose={() => setOpenMonthlyBudget(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="space-y-2">
                <h1 className="text-blue-600 text-lg font-semibold">
                  Set Your Monthly Budget
                </h1>
                <input
                  type="number"
                  value={monthlybudget}
                  className="border border-black w-full p-2"
                  onChange={(e) => setmonthlybudget(e.target.value)}
                />
                <button
                  onClick={handleMonthlyBudget}
                  className="inline-flex border px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-green-500"
                >
                  Submit
                </button>
              </div>
            </Box>
          </Modal>
        </div>
        <span className="text-lg font-bold text-blue-600">
          {expenseData.monthlyBudget}
        </span>
      </div>
    </div>
  );
};

export default Budget;
