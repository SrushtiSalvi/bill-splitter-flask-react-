import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { delete_expense } from "../api";
import EditExpense from "./EditExpense";

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

const ExpensesTable = ({ expenses, setExpenses }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalopen, setEditModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  console.log(expenses);

  const handleDelete = async (id) => {
    // console.log(id);
    const res = await delete_expense(id);

    console.log(res.data);
    if (res.data.success) {
      const newExpenses = expenses.filter((expense) => expense._id !== id);
      setExpenses(newExpenses);
      setDeleteModalOpen(false);
      toast(res.data.message);
    } else {
      toast(res.data.message);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Sr.No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Amount(Rs)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {expense.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {expense.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => {
                          setModalData(expense);
                          setEditModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <Modal
                        open={editModalopen}
                        onClose={() => setEditModalOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <EditExpense
                            data={modalData}
                            setEditModalOpen={setEditModalOpen}
                          />
                        </Box>
                      </Modal>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <button
                        // onClick={handleOpen}
                        onClick={() => {
                          setModalData(expense);
                          setDeleteModalOpen(true);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                      <Modal
                        open={deleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <div className="space-y-4">
                            <h1 className="font-bold">
                              Are you sure you want to delete this expense?
                            </h1>
                            <button
                              type="button"
                              onClick={() => handleDelete(modalData._id)}
                              className="px-2 py-1 text-green-600 border rounded-xl mr-2 border-green-600"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteModalOpen(false)}
                              className="px-2 py-1 text-red-600 border rounded-xl mr-2 border-red-600"
                            >
                              No
                            </button>
                          </div>
                        </Box>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesTable;
