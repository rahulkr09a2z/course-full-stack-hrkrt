import { getBearerToken } from "@courseApp/utils/tokenHelpers";

export const bearerInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(async function (config) {
    try {
      const token = await getBearerToken();
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    } catch (err) {
      Promise.reject(err);
    }
  });
  return axiosInstance;
};
