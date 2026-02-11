import axios from "axios";
const apiUrl = "http://localhost:8000";

const HEADERS = {
  "Content-Type": "application/json",
};

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    ...HEADERS,
  },
  withCredentials: true,
});
