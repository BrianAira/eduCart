import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { api } from "../../../lib/axiosInstance";

interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  role:string|null;

} 

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("user"),
  role:localStorage.getItem("role"),
  isAuthenticated: !!localStorage.getItem("token"),
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; username: string, role:string }>) {
      console.log("LOGIN PAYLOAD:", action.payload);
      console.log("AUTH STATE:", state);

      state.token = action.payload.token;
      state.username = action.payload.username;
      state.role=action.payload.role;
      state.isAuthenticated = true;

      // Persistimos en localStorage y axios
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.username);
      localStorage.setItem("role", action.payload.role);
      // api.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;
    },

    logout(state) {
      state.token = null;
      state.username = null;
      state.role=null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      // delete api.defaults.headers.common.Authorization;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
