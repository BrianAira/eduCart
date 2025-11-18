import { useMutation } from "@tanstack/react-query";
import type { LoginPayload, RegisterPayload } from "../types/types";
import { api } from "../../../lib/axiosInstance";
import { useAppDispatch } from "../../../store/hook";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";


// $2b$12$Zo8.N8NnHIAMTgGcpO464eVmIJcHEXj0WPbEnMqTFn90pC0XwMXVi
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post("/auth/login", payload);
      
      console.log("Login response", data);
      alert(JSON.stringify(data, null, 2)); 
      console.log("Login response", data)
      
      dispatch(
        loginSuccess({
          token: data.access_token,
          username: data.username,
          role: data.role, // 👈 asegurate que esto existe en el backend
        })
      );

      console.log("LOGIN RESPONSE:", data)

      return data;
    },

    onSuccess: () => {
      navigate("/");
    },
  });
};


export const useRegister = () => {
  const login=useLogin();
  // const dispatch=useAppDispatch();
  // const navigate=useNavigate();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      await api.post("/auth/register", payload);

      login.mutate(payload);
      return payload;
      // const { data } = await api.post("/auth/register", payload);
      // dispatch(loginSuccess({
        // token:data.access_token,
        // username:data.username,
        // role:data.role,
      // }));
      // navigate("/");
       

      // return data
    },

    // onSuccess:(data)=>{
    //   login.mutate({username:data.username, password:data.password});
    // }
  });
};