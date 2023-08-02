import axios from "axios";
import { bearerInterceptors } from "@courseApp/utils/interceptors";

const getAxiosInstance = (baseUrl) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  bearerInterceptors(axiosInstance);

  return axiosInstance;
};

class ApiClient {
  constructor(baseUrl) {
    console.log("yyyy zz", baseUrl);
    this.client = getAxiosInstance(baseUrl);
  }
  async request(config) {
    try {
      const response = await this.client.request(config);
      return response;
    } catch (err) {
      console.log("zzz err");
      throw err;
    }
  }

  async get(endPoint, params, headers) {
    return this.request({ method: "GET", url: endPoint, params, headers });
  }
  async post(endPoint, data, params, headers) {
    console.log("yyy ", endPoint, data);
    return this.request({
      method: "POST",
      url: endPoint,
      data,
      params,
      headers,
    });
  }
  async put(endPoint, data, params, headers) {
    return this.request({
      method: "PUT",
      url: endPoint,
      data,
      params,
      headers,
    });
  }
  async delete(endPoint, data, params, headers) {
    return this.request({
      method: "DELETE",
      url: endPoint,
      data,
      params,
      headers,
    });
  }
}

const baseUrl = "http://localhost:8080/";
const apiClient = new ApiClient(baseUrl);

export { apiClient as ApiClient };
