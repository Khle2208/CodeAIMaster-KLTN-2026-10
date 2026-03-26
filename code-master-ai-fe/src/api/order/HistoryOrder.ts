import axios from "axios";

export interface OrderItem {
  _id: string;
  user_id: string;
  status: string;
  total_price?: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface HistoryOrderResponse {
  message: string;
  data: {
    results: OrderItem[];
    totalItems: number;
    totalPages: number;
    current: number;
    pageSize: number;
  };
}

interface GetHistoryOrderParams {
  current?: number;
  pageSize?: number;
  status?: string;
}

export const GetHistoryOrder = async (
  params: GetHistoryOrderParams = {},
): Promise<HistoryOrderResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Không tìm thấy token đăng nhập");
  }

  const { current = 1, pageSize = 10, status } = params;

  const Url = "http://localhost:3000/api/v1/orders/my-orders";

  try {
    const res = await axios.get<HistoryOrderResponse>(Url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        current,
        pageSize,
        ...(status ? { status } : {}),
      },
    });

    console.log("LẤY LỊCH SỬ ĐƠN HÀNG THÀNH CÔNG:", res.data);
    return res.data;
  } catch (err: any) {
    console.log("LẤY LỊCH SỬ ĐƠN HÀNG THẤT BẠI:", err.response?.data || err);
    throw err;
  }
};
