/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class AxiosApi {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      // headers: {
      //   "Content-Type": "application/json; charset=utf-8",
      // },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (config.method?.toLowerCase() === "get") {
          config.params = config.params || {};
          config.params._ = new Date().getTime();
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  public async getData<T>(
    endPoint: string,
    config?: AxiosRequestConfig<unknown>,
  ) {
    try {
      const response = await this.axiosInstance.get<T>(endPoint, config);

      return response;
    } catch (er: unknown) {
      const error = er as AxiosError;
      if (error.response) {
        console.log("Server responded with status:", error.response.status);
        console.log("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      throw error;
    }
  }

  public async postData<T>(
    endPoint: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown>,
  ) {
    try {
      const response = await this.axiosInstance.post<T>(endPoint, data, config);

      return response;
    } catch (er: unknown) {
      const error = er as AxiosError;
      if (error.response) {
        console.log("Server responded with status:", error.response.status);
        console.log("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      throw error;
    }
  }
}

export interface ErrorT {
  path: string;
  method: string;
  code: number;
  message: string;
  time: string;
}

export const errorHandler = (error: unknown) => {
  const axiosError = error as AxiosError<ErrorT>;
  throw axiosError.response?.data;
};

export const api = new AxiosApi();
