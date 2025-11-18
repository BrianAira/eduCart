import { useAppSelector } from "../store/hook";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps{
    children:React.ReactNode;
    allowedRoles?:string[];
}


export default function PrivateRoute(
    {children, allowedRoles}:PrivateRouteProps){
      
    const {isAuthenticated, role}=useAppSelector((state)=>state.auth);
console.log("AUTH STATE:", { isAuthenticated, role });

    if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si hay roles permitidos, y el rol del usuario no está en la lista
  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/" replace state={{ error: "not-authorized" }} />;
  }
console.log('Auth State:', { isAuthenticated, role });

  // Caso válido: renderizamos contenido
  return <>{children}</>;
  

}