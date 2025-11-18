import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Navigation";
import HomePage from "../features/home/views/HomePage";
import ProductsPage from "../features/Products/views/ProductsPage";
import CartPage from "../features/Cart/views/CartPage";
import RegisterPage from "../features/Auth/views/RegisterPage";
import LoginPage from "../features/Auth/views/LoginPage";
import PrivateRoute from "./PrivateRoute";
import CheckoutSuccessPage from "../features/Cart/views/CheckoutSuccesPage";
import ProductCrudPage from "../features/Products/views/ProductCrudPage";


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
         
        <Route path="products" element={<ProductsPage />} />
        
        <Route path="cart" element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        } />
        
        <Route path="checkout-success" element={<CheckoutSuccessPage></CheckoutSuccessPage>}></Route>

        <Route
          path="admin/products"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ProductCrudPage />
            </PrivateRoute>
          }
        />

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
