import React from "react";
import { useNavigate } from "react-router";

const LandingPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="flex flex-col justify-center items-center gap-5 shadow-xl w-[40%] h-[50%]">
        <h1 className="text-2xl">Welcome to UrbaneNestPro</h1>
        <div className="flex gap-5">
          <button
            className="bg-black text-white p-2 rounded-md hover:opacity-80"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="bg-black text-white p-2 rounded-md hover:opacity-80"
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
