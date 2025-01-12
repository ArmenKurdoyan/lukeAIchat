import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://luke-a-ichat.vercel.app",
  withCredentials: true,
});
