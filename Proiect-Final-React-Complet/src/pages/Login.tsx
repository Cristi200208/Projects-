import React, { useContext, useEffect, useState } from "react";
import { getUserData, loginUser } from "../api/methods/user";
import { useForm } from "react-hook-form";
import { AuthContextProps, Users } from "../types/users";
import { useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthContext";
import { Link } from "react-router-dom";

const Login: React.FC = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Users>();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext) as AuthContextProps;

  const onSubmitData = async (data: Partial<Users>) => {
    setError(null);
    try {
      const userCredentials = await loginUser(data);
      console.log(userCredentials);
      setUser(await getUserData(userCredentials));
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (
          error.message.includes(
            "FirebaseError: Firebase: Error (auth/invalid-credential)."
          )
        ) {
          setError("Email or Password Invalide");
        } else {
          setError("Email or Password Invalide");
        }
      }
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loggedUser") as string)) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        className="flex flex-col justify-center items-center bg-white gap-6 p-8 rounded-lg w-[80%] sm:w-[60%] md:w-[40%] shadow-xl"
        onSubmit={handleSubmit(onSubmitData)}
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Log In</h1>

        <input
          className="border-2 border-gray-300 rounded-md w-[80%] h-12 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3"
          {...register("email", {
            required: "Email Required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Email Invalid Format",
            },
          })}
          type="email"
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <input
          className="border-2 border-gray-300 rounded-md w-[80%] h-12 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3"
          {...register("password", { required: "Password Required" })}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <button
          type="submit"
          className="bg-black text-white w-[60%] h-12 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
        >
          Login
        </button>

        {error && <span className="text-red-500">{error}</span>}

        <Link
          to={"/register"}
          className="text-blue-500 hover:text-blue-700 mt-4 text-sm"
        >
          No account? Create One
        </Link>
      </form>
    </div>
  );
};

export default Login;
