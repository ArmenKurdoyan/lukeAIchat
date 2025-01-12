import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `http://13.49.80.149:3001`,
  withCredentials: true,
});
