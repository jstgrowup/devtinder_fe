import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log("apiUrl:", apiUrl);

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
