import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InllbmhpMTkwM0BnbWFpbC5jb20iLCJzdWIiOiI2OWMxNzc1MzI2YmU5OTMxMjU2OGZhMTIiLCJpYXQiOjE3NzQ0MzA4MTYsImV4cCI6MTg2MDgzMDgxNn0.B-cXNdzvZTgD1jIihCc9ssFygkDTPEZgy4o57d3ZQ2o";
export interface CreatePaymentPayload {
  payment_method: "momo" | "vnpay";
}

export const createPayment = async (payload: CreatePaymentPayload) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.post(`${API_URL}/payments/create`, payload, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi tạo thanh toán:", error);
    throw error;
  }
};

export const getMyPayments = async () => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.get(`${API_URL}/payments/my-payments`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi lấy danh sách thanh toán:", error);
    throw error;
  }
};
