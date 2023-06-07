import axios from "axios";

export const globalAxios = axios.create({
  baseURL: process.env.NEXT_API_URL || "http://localhost:8080",
});
