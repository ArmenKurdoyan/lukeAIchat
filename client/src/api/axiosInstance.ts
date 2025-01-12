import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://armenkurdoyan.github.io/lukeAIchat",
  withCredentials: true,
});
