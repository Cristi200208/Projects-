import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/methods/user";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps } from "../types/users";

const Navbar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext) as AuthContextProps;
  const [openClose, setOpenClose] = useState(false);

  const handleLogOutUser = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/landing-page");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <></>;
  }

  return (
    <nav className="flex item justify-between p-3 bg-white shadow-lg  md:flex-row xxs:flex-col gap-3">
      {openClose ? (
        <div className=" absolute mt-14 mx-0  left-0 md:top-0 xxs:top-[15%] gap-3 rounded-br-md bg-white text-black shadow-2xl flex flex-col justify-center items-center space-x-2 transition-all ease-out duration-500 h-[500px] md:w-[20%] xxs:w-[100%] text-xl ">
          <Link
            onClick={() => setOpenClose(false)}
            className="flex justify-center items-center w-[100%] hover:text-gray-500"
            to={"/"}
          >
            Home
          </Link>
          <Link
            onClick={() => setOpenClose(false)}
            className="flex justify-center items-center w-[100%] hover:text-gray-500"
            to={"/add-flats"}
          >
            Add Flats
          </Link>
          <Link
            onClick={() => setOpenClose(false)}
            className="flex justify-center items-center w-[100%] hover:text-gray-500"
            to={"/my-profile"}
          >
            My Profile
          </Link>
          <Link
            onClick={() => setOpenClose(false)}
            className="flex justify-center items-center w-[100%] hover:text-gray-500"
            to={"/my-flats"}
          >
            My Flats
          </Link>
          <Link
            onClick={() => setOpenClose(false)}
            className="flex justify-center items-center w-[100%] hover:text-gray-500"
            to={"/favorites"}
          >
            Favorites
          </Link>

          <Link
            onClick={() => setOpenClose(false)}
            className="flex justify-center items-center w-[100%] hover:text-gray-500"
            to={"messages"}
          >
            My Messages
          </Link>
          {user.role === "admin" && (
            <>
              <Link
                onClick={() => setOpenClose(false)}
                className="flex justify-center items-center w-[100%] hover:text-gray-500"
                to={"all-users-admin"}
              >
                All Users List
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button onClick={() => setOpenClose(true)} className="relative group">
            <div className="relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all bg-black ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
              <div className="transform transition-all duration-150 overflow-hidden -translate-y-5 group-focus:translate-y-3">
                <svg
                  className="h-6 w-6h-6 w-6 animate-bounce text-white"
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

              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden -translate-y-3">
                <div className="bg-white mb-1.5 h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6"></div>
                <div className="bg-white mb-1.5 h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-y-6 delay-75"></div>
                <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6 delay-100"></div>
              </div>
            </div>
          </button>
        </div>
      )}
      {openClose ? (
        <div className="flex justify-center items-center">
          <button
            onClick={() => setOpenClose(false)}
            className="relative group"
          >
            <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all bg-black ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden group-focus:-translate-y-1.5 group-focus:-rotate-90">
                <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:rotate-[42deg] group-focus:w-2/3 delay-150"></div>
                <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10"></div>
                <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:-rotate-[42deg] group-focus:w-2/3 delay-150"></div>
              </div>
            </div>
          </button>
        </div>
      ) : null}
      <div className="flex  justify-center items-center ">
        {user ? (
          <span className="flex justify-center items-center text-xl ">
            Welcome {user.firstName}
          </span>
        ) : null}
      </div>
      <div className="flex  justify-center items-center">
        <button
          onClick={() => handleLogOutUser()}
          className="bg-black text-white p-2 rounded-md hover:opacity-80"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
