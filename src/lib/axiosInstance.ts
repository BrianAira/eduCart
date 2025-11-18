import axios from "axios";
import { logout } from "../features/Auth/redux/authSlice";
import { store } from "../store/store";


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res)=>res,
  (error)=>{
    if(error.response?.status===401){
      store.dispatch(logout());
      window.location.href=("/login")
      
    }
    return Promise.reject(error)
  }
) 