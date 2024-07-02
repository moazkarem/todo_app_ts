import { NavLink, useLocation } from "react-router-dom";
import Button from "./ui/Button";
const Navbar = () => {
  const { pathname } = useLocation();
  const storageKey = "logged";
  const userDatastring = localStorage.getItem(storageKey);
  const userData = userDatastring ? JSON.parse(userDatastring) : null;
  const logout = () => {
    localStorage.removeItem(storageKey);
    setTimeout(() => {
      location.replace(pathname);
    }, 1600);
  };
  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 bg-indigo-600 px-3 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        {userData ? (
          <div className="flex items-center text-indigo-600 space-x-2">
            <li className=" duration-200  text-white font-semibold text-lg">
              <NavLink to="/profile">profile</NavLink>
            </li>
           
            <Button size={"sm"}
              onClick={logout}
       
            >
              Logout
            </Button>
          </div>
        ) : (
          <p className="flex items-center space-x-3">
            <li className="text-white duration-200 font-semibold text-lg">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="text-white duration-200 font-semibold text-lg">
              <NavLink to="/login">Login</NavLink>
            </li>
          </p>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
