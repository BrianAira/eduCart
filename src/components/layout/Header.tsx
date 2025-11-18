import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { logout } from "../../features/Auth/redux/authSlice";

export default function Header() {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const totalItems = useAppSelector((state) => state.cart.items);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-yellow-300 font-semibold"
      : "hover:text-yellow-300 transition-colors duration-200";

  return (
    <header className="bg-linear-to-r from-indigo-600 to-indigo-500 shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 text-white">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          EduCart
        </Link>

        <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex space-y-4 md:space-y-0 md:space-x-6 text-sm font-medium absolute md:static top-16 left-0 right-0 bg-indigo-600 md:bg-transparent p-6 md:p-0 z-10`}
        >
          <li>
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={linkClasses}>
              Products
            </NavLink>
          </li>

          {isAuthenticated && role === "admin" && (
            <li>
              <NavLink to="/admin/products" className={linkClasses}>
                Admin Panel
              </NavLink>
            </li>
          )}

          {!isAuthenticated ? (
            <>
              <li>
                <NavLink to="/login" className={linkClasses}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={linkClasses}>
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                className="hover:text-yellow-300 transition-colors duration-200"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        <div className="relative hidden md:block">
          <NavLink to="/cart" className="hover:text-yellow-300">
            <FaShoppingCart size={20} />
          </NavLink>
          <span
            id="cart-counter"
            className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full"
          >
            {totalItems.length}
          </span>
        </div>
      </nav>
    </header>
  );
}
