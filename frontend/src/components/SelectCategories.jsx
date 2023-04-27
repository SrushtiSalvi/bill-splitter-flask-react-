import { useState } from "react";
import { Fragment } from "react";
import {
  selectExpenseCategoriesData,
  setExpenseCategoriesData,
} from "../features/expensesCategoriesSlice";
import { selectExpenseData, setExpenseData } from "../features/expensesSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  get_expenses_by_price,
  get_all_expenses,
  get_expenses_by_category,
} from "../api";

const CategoriesDropdown = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenseData).expenses;

  const expenseCategoriesData = useSelector(selectExpenseCategoriesData);
  const categories = expenseCategoriesData.expenseCategories;

  const selectedCategories = expenseCategoriesData.expenseCategories
    .map((category) => {
      if (category.checked === true) {
        return category.name;
      }
    })
    .filter((notUndefined) => notUndefined !== undefined);

  const handleApplyFilter = async () => {
    console.log(selectedCategories);
    if (selectedCategories.length === 0) {
      console.log("No categories selected");
      get_all_expenses()
        .then((res) => {
          dispatch(
            setExpenseData({
              expenses: res.data.expenses,
              totalAmount: res.data.total_amount,
            })
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      const res = await get_expenses_by_category(selectedCategories);
      if (res.data.success) {
        dispatch(
          setExpenseData({
            expenses: res.data.expenses,
            totalAmount: res.data.total_amount,
          })
        );
      } else {
        console.log(res.data.message);
      }
    }
  };

  const handleCategoryCheck = async (categoryName) => {
    const updatedCategories = categories.map((category) => {
      if (category.name === "All") {
        return { ...category };
      } else if (category.name === categoryName) {
        return { ...category, checked: !category.checked };
      }
      return category;
    });
    console.log(updatedCategories);
    dispatch(
      setExpenseCategoriesData({ expenseCategories: updatedCategories })
    );
    handleApplyFilter();
  };

  const handlePriceCheck = async (amount) => {
    let minPrice, maxPrice;
    if (amount === "") {
      await get_all_expenses()
        .then((res) => {
          dispatch(
            setExpenseData({
              expenses: res.data.expenses,
              totalAmount: res.data.total_amount,
            })
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      minPrice = amount.split("-")[0];
      maxPrice = amount.split("-")[1];

      await get_expenses_by_price(minPrice, maxPrice)
        .then((res) => {
          dispatch(
            setExpenseData({
              expenses: res.data.expenses,
              totalAmount: res.data.total_amount,
            })
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    // const filteredExpenses = expenses
    //   .map((expense) => {
    //     if (expense.amount >= minPrice && expense.amount <= maxPrice) {
    //       return expense;
    //     }
    //   })
    //   .filter((notUndefined) => notUndefined !== undefined);
    // console.log(filteredExpenses);
  };

  return (
    <div className="mb-2">
      <h1 className="text-lg font-bold text-blue-600 my-3">Filter by</h1>
      <div>
        <label className="block text-sm font-semibold text-gray-800 my-1">
          Category
        </label>
        <select
          multiple
          required
          type="text"
          onClick={(e) => handleCategoryCheck(e.target.value)}
          className=" w-full px-2 py-2  text-black bg-white border-gray-400 border"
        >
          {categories.map((category, index) => (
            <option
              className={`${category.checked ? "bg-gray-200 " : "bg-white "}`}
              value={category.name}
              key={index}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="my-3">
        <label className="block text-sm font-semibold text-gray-800 my-1">
          Amount
        </label>
        <select
          required
          type="text"
          onClick={(e) => handlePriceCheck(e.target.value)}
          className=" w-full px-3 py-2  text-black bg-white border-gray-400 border"
        >
          <option value="">All</option>
          <option value="0-100">0-100</option>
          <option value="100-500">100-500</option>
          <option value="500-1000">500-1000</option>
          <option value="1000-5000">1000-5000</option>
          <option value="5000-10000">5000-10000</option>
          <option value=">10000">{">"}10000</option>
        </select>
      </div>
    </div>
  );
};

export default CategoriesDropdown;
