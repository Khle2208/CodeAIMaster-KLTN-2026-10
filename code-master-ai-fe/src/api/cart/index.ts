import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InllbmhpMTkwM0BnbWFpbC5jb20iLCJzdWIiOiI2OWMxNzc1MzI2YmU5OTMxMjU2OGZhMTIiLCJpYXQiOjE3NzQ0MzA4MTYsImV4cCI6MTg2MDgzMDgxNn0.B-cXNdzvZTgD1jIihCc9ssFygkDTPEZgy4o57d3ZQ2o";
export const getCartList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.get(`${API_URL}/carts/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi lấy danh sách cart:", error);
    throw error;
  }
};

export const getCartListQuick = async () => {
  try {
    const response = await axios.get(`${API_URL}/carts/get`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi lấy cart:", error);
    throw error;
  }
};

export const removeCartItem = async (itemId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/carts/delete/${itemId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi xóa cart:", error);
    throw error;
  }
};
