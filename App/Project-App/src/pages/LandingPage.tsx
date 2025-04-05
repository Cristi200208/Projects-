import React from "react";
import { useNavigate } from "react-router";

const LandingPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="flex flex-col justify-center items-center gap-8 shadow-lg w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] p-8 bg-white rounded-xl">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Welcome to <span className="text-blue-600">UrbaneNestPro</span>
        </h1>
        <div className="flex gap-6 justify-center w-full">
          <button
            className="bg-black text-white p-3 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="bg-black text-white p-3 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
