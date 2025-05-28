import axios from "axios";

const httpRequest = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export default httpRequest;
