import React from "react";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "../../redux/api/userApi";

const Header = () => {
  const navigate = useNavigate();
  const [logout] = useLazyLogoutQuery();
  const { isLoading } = useGetMeQuery();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    logout();
    navigate(0);
  };
  const adminMenu = [{ text: "Dashboard", path: "/admin/dashboard" }];
  const userMenu = [
    { text: "Homepage", path: "/" },
    { text: "Transaction", path: "/transaction" },
    { text: "Account Details", path: "/account_details" },
    { text: "Transaction History", path: "/transaction_history" },
  ];
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {user?.role === "admin"
              ? adminMenu?.map((items) => (
                  <li>
                    <Link to={items?.path}>{items?.text}</Link>
                  </li>
                ))
              : userMenu?.map((items) => (
                  <li>
                    <Link to={items?.path}>{items?.text}</Link>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Banking app</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        {isAuthenticated ? (
          <button className="btn btn-error btn-sm" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to={"/login"}>
            <button className="btn btn-primary btn-sm">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
