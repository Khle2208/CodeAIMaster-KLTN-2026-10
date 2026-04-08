import axios from "axios";
import { useUserInfo } from "../store/user";

export const axiosInstance = axios.create({
  baseURL: "https://codeaimaster-kltn-2026-10.onrender.com/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response; // api thanh cong cho qua
  },
  async (error) => {
    const originalRequest = error.config;
    //Bỏ qua các route auth — không refresh cho những URL này
    const skipRefreshUrls = ["/auth/refresh", "/auth/login", "/auth/logout"];
    const isSkipped = skipRefreshUrls.some((url) =>
      originalRequest.url?.includes(url),
    );
    // bat loi het han access token
    if (error.response?.status === 401 && !originalRequest._retry && !isSkipped) {
      originalRequest._retry = true;
      try {
        await axiosInstance.post("/auth/refresh");
        return axiosInstance(originalRequest);
      } catch (error) {
        useUserInfo.getState().clearUserInfo();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;

// import axios, { AxiosInstance } from "axios";
// import { useUserInfo } from "../store/user";

// // 1. Trạm gọi lên Render
// export const axiosRender = axios.create({
//   baseURL: "https://codeaimaster-kltn-2026-10.onrender.com/api/v1",
//   withCredentials: true,
// });

// // 2. Trạm gọi Local
// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:3001/api/v1",
//   withCredentials: true,
// });

// // 3. Viết một hàm xài chung để gắn lưới bắt lỗi (Interceptor)
// const setupInterceptors = (axiosClient: AxiosInstance) => {
//   axiosClient.interceptors.response.use(
//     (response) => {
//       return response; // API thành công -> cho qua
//     },
//     async (error) => {
//       const originalRequest = error.config;

//       // ĐÃ SỬA LỖI: Thêm dấu ! ở đây (chưa retry thì mới chạy)
//       if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;

//         try {
//           // Xin lại Token mới qua cái máy chủ mà request đang gọi tới
//           await axiosClient.post('/auth/refresh');

//           // Xin thành công -> Chạy lại request gốc
//           return axiosClient(originalRequest);
//         } catch (refreshError) {
//           // Token hết hạn hẳn -> Đá về login
//           useUserInfo.getState().clearUserInfo();
//           window.location.href = '/login';
//           return Promise.reject(refreshError);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// setupInterceptors(axiosRender);
// setupInterceptors(axiosInstance);

// export default { axiosInstance, axiosRender };
