import axios from "axios";

const apiaxios = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

apiaxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    // if (error.response.status === 401) {
    //   localStorage.removeItem("access_token");
    //   // localStorage.removeItem("user");
    //   window.location.href = "/login";
    // }
    // return Promise.reject(error);
  }
);

const api = "http://127.0.0.1:5000";

const token = localStorage.getItem("access_token");

export const login = async (email, password) => {
  try {
    const response = await apiaxios.post(`${api}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const get_user_details = async () => {
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

export const add_expense = async (title, amount, category) => {
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
