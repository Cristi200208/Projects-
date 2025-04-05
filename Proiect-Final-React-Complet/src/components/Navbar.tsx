import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/methods/user";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps } from "../types/users";
import { jwtDecode } from "jwt-decode";

const Navbar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext) as AuthContextProps;
  const [openClose, setOpenClose] = useState(false);

  interface DecodedToken {
    exp: number;
    [ket: string]: unknown;
  }

  const handleLogOutUser = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/landing-page");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("authToken");

      if (token) {
        const decodedToken: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          logoutUser();
          navigate("/landing-page");
          return;
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [navigate, setUser]);

  if (!user) {
    return <></>;
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-lg md:flex-row xxs:flex-col gap-4">
      {openClose ? (
        <div className="absolute top-16 left-0 right-0 md:top-0 xxs:top-[15%] gap-3 rounded-br-lg bg-white text-black shadow-2xl flex flex-col justify-center items-center transition-all ease-out duration-500 h-[500px] md:w-[20%] xxs:w-full text-lg space-y-4 p-4">
          <Link
            onClick={() => setOpenClose(false)}
            className="w-full text-center hover:text-gray-500 py-2 transition-all duration-300"
            to={"/"}
          >
            Home
          </Link>
          <Link
            onClick={() => setOpenClose(false)}
            className="w-full text-center hover:text-gray-500 py-2 transition-all duration-300"
            to={"/add-flats"}
          >
            Add Flats
          </Link>
          <Link
            onClick={() => setOpenClose(false)}
            className="w-full text-center hover:text-gray-500 py-2 transition-all duration-300"
            to={"/my-profile"}
          >
            My Profile
          </Link>
          <Link
            onClick={() => setOpenClose(false)}
            className="w-full text-center hover:text-gray-500 py-2 transition-all duration-300"
            to={"/my-flats"}
          >
            My Flats
          </Link>
          <Link
            onClick={() => setOpenClose(false)}
            className="w-full text-center hover:text-gray-500 py-2 transition-all duration-300"
            to={"/favorites"}
          >
            Favorites
          </Link>
          {user.isAdmin && (
            <Link
              onClick={() => setOpenClose(false)}
              className="w-full text-center hover:text-gray-500 py-2 transition-all duration-300"
              to={"/all-users-admin"}
            >
              All Users List
            </Link>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button onClick={() => setOpenClose(true)} className="relative group">
            <div className="flex flex-col items-center justify-center w-10 h-10 bg-black rounded-full ring-0 ring-gray-300 hover:ring-8 transition-all duration-300 shadow-lg">
              <svg
                className="h-6 w-6 text-white animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
        </div>
      )}

      {openClose && (
        <div className="flex justify-center items-center">
          <button
            onClick={() => setOpenClose(false)}
            className="relative group"
          >
            <div className="flex flex-col items-center justify-center w-10 h-10 bg-black rounded-full ring-0 ring-gray-300 hover:ring-8 transition-all duration-300 shadow-lg">
              <div className="bg-white h-1 w-7 transform transition-all duration-300 origin-left group-focus:rotate-[45deg]"></div>
              <div className="bg-white h-1 w-7 transform transition-all duration-300 group-focus:translate-x-6"></div>
              <div className="bg-white h-1 w-7 transform transition-all duration-300 origin-left group-focus:rotate-[-45deg]"></div>
            </div>
          </button>
        </div>
      )}

      <div className="flex justify-center items-center pl-14">
        {user && (
          <span className="text-xl font-semibold">
            Welcome, <span className="text-blue-500">{user.firstName}</span>
          </span>
        )}
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={handleLogOutUser}
          className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
