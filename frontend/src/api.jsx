import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectUserAccessToken } from "./features/userSlice";

const apiaxios = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

apiaxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const api = "http://127.0.0.1:5000";

// const token = useSelector(selectUserAccessToken);
// const token = localStorage.getItem("access_token");
// console.log("loading access token from local storage", token);

export const login = async (email, password) => {
  try {
    const response = await apiaxios.post(`${api}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  firstName,
  lastName,
  number,
  email,
  password
) => {
  try {
    const response = await apiaxios.post(`${api}/signup`, {
      firstName,
      lastName,
      number,
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_user_details = async () => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await apiaxios.get(`${api}/get_user_details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_all_expenses = async () => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await apiaxios.get(`${api}/expense/get_all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const set_monthly_budget = async (monthly_budget) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await apiaxios.post(
      `${api}/user/set_monthly_budget`,
      { monthly_budget },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const set_yearly_budget = async (yearly_budget) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await apiaxios.post(
      `${api}/user/set_yearly_budget`,
      { yearly_budget },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_monthly_budget = async () => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await apiaxios.get(`${api}/user/get_monthly_budget`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_yearly_budget = async () => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await apiaxios.get(`${api}/user/get_yearly_budget`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_expenses_by_category = async (categories) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await apiaxios.post(
      `${api}/expense/get_all_by_category`,
      {
        categories: categories,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const get_expenses_by_price = async (min, max) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await apiaxios.post(
      `${api}/expense/get_all_by_price`,
      {
        min: min,
        max: max,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const add_expense = async (title, amount, category) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await apiaxios.post(
      `${api}/expense/add`,
      { title, amount, category },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_expense = async (id) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await apiaxios.get(`${api}/expense/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const update_expense = async (id, title, amount) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await apiaxios.put(
      `${api}/expense/update/${id}`,
      { title, amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const delete_expense = async (id) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await apiaxios.delete(`${api}/expense/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
