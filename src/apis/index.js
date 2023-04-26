import axios from "axios";

// const baseURL = "https://shopaholic-api.onrender.com";
const baseURL = "http://localhost:4000";

export const getAllProductReq = (keyword = "") =>
  axios.get(baseURL + `/api/product?search=${keyword}`);

export const getProductDetailReq = (id) =>
  axios.get(baseURL + `/api/product/${id}`);

export const getAllCategory = () =>
  axios.get(baseURL + "/api/product/category");

export const userLoginReq = async (email, password) => {
  axios.defaults.withCredentials = true;

  const response = await axios.post(baseURL + "/api/user/login", {
    headers: {
      "Content-Type": "application/json",
    },
    email,
    password,
  });

  return response;
};

export const userRegisterReq = (name, email, password) => {
  return axios.post(baseURL + "/api/user/register", {
    name,
    email,
    password,
  });
};

export const userLogoutReq = async () => {
  return await axios.post(baseURL + "/api/user/logout", {
    withCredentials: true,
  });
};

export const userLoadReq = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get(baseURL + "/api/user/me", config);
};

export const userUpdateReq = async (userData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.post(baseURL + "/api/user/me/update", userData, config);
};

export const userUpdatePasswordReq = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  console.log(userData);
  return await axios.post(
    baseURL + "/api/user/me/updatepassword",
    userData,
    config
  );
};

export const getOneProductReq = async (id) => {
  return await axios.get(baseURL + `/api/product/${id}`);
};

export const createOrderReq = async (order) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.post(baseURL + "/api/order/new", order, config);
};

export const getMyOrdersReq = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get(baseURL + "/api/order/me", config);
};

export const getSingleOrderReq = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get(baseURL + `/api/order/${id}`, config);
};

export const getAllOrdersReq = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get(baseURL + "/api/order/me", config);
};

export const createReviewReq = async (rating, comment, productId) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.put(
    baseURL + "/api/product/review",
    { rating, comment, productId },
    config
  );
};

//ADMIN

export const adminGetAllProductsReq = async () => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get(baseURL + "/api/product/admin/products", config);
};

export const adminGetAllUsersReq = async () => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get(baseURL + "/api/user/admin/users", config);
};

export const adminGetAllOrdersReq = async () => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get(baseURL + "/api/order/admin/orders", config);
};
export const adminCreateProductReq = async (productData) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.post(baseURL + "/api/product/", productData, config);
};
export const adminDeleteProductReq = async (id) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.delete(baseURL + `/api/product/${id}`, config);
};
export const adminDeleteOrderReq = async (id) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.delete(baseURL + `/api/order/admin/order/${id}`, config);
};
export const adminDeleteUserReq = async (id) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.delete(baseURL + `/api/user/admin/user/${id}`, config);
};
export const adminUpdateOrderReq = async (id, orderData) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.put(
    baseURL + `/api/order/admin/order/${id}`,
    orderData,
    config
  );
};
export const adminDeleteReviewReq = async (Data) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.delete(
    baseURL +
      `/api/product/review?productId=${Data.productID}&id=${Data.reviewID}`,
    config
  );
};

export const adminUpdateProductReq = async (id, productData) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.put(baseURL + `/api/product/${id}`, productData, config);
};

export const adminUpdateUserReq = async (id, userData) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.put(
    baseURL + `/api/user/admin/user/${id}`,
    userData,
    config
  );
};
