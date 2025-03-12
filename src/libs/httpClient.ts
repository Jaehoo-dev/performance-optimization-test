import axios, { AxiosResponse } from "axios";

const TIMEOUT = 10_000;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: TIMEOUT,
});

interface GetOptions {
  params?: object;
}

interface PostOptions<D> {
  data?: D;
}

export const api = {
  get: async <T>(url: string, options?: GetOptions): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.get(url, {
      params: options?.params,
    });

    return response.data;
  },
  post: async <T, D = unknown>(
    url: string,
    options?: PostOptions<D>
  ): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.post(
      url,
      options?.data
    );

    return response.data;
  },
};
