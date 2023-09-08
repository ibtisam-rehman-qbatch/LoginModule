import axios from "axios";
const MAX_TRY = 2;

let retries = 0;

const api = {
  axiosInstance: axios.create({
    baseURL: "https://api.escuelajs.co/api/v1/auth",
  }),
  user: {
    login: async (data) => api.axiosInstance.post("/login", data),
    profile: async () => api.axiosInstance.get("/profile"),
    refreshToken: async (refresh_token) =>
      api.axiosInstance.post("/refresh-token", {
        refreshToken: refresh_token,
      }),
  },
};

api.axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    const status_code = err?.response?.data?.statusCode;
    if (status_code === 401 && retries < MAX_TRY) {
      retries++;

      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token) {
        const newTokens = await api.user.refreshToken(refresh_token);
        const upadatedAccessToken = newTokens.data.access_token;
        const upadatedRefreshToken = newTokens.data.refresh_token;

        localStorage.setItem("access_token", upadatedAccessToken);
        localStorage.setItem("refresh_token", upadatedRefreshToken);

        return api.axiosInstance(originalConfig);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
