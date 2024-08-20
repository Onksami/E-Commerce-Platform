import axios from "axios";

const accessToken  = localStorage.getItem("accessToken");

export const api = axios.create({
    baseURL: 'https://shopping-app-be.onrender.com/', // Base URL for all requests
    timeout: 15000, // 10 seconds timeout for requests
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken, // Authorization token if needed
    },
  });