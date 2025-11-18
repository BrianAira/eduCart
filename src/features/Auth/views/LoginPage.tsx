// import { useAppDispatch } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
// import { api } from "../../../lib/axiosInstance";
import { useAppSelector } from "../../../store/hook";
// import { loginSuccess } from "../redux/authSlice";
// import { api } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useAuth";

export default function LoginPage() {
  // const dispatch = useAppDispatch();
  const navigate=useNavigate();
  const login=useLogin()
  const {isAuthenticated}=useAppSelector((state)=>state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/");
    }
  },[isAuthenticated, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({username,password})
  };



  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">Iniciar sesión</h1>

      {/* {error && <p className="text-red-500">{error}</p>} */}

      <input
        className="w-full border rounded p-2 mb-3"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="w-full border rounded p-2 mb-3"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Entrar
      </button>
    </form>
  );
}
