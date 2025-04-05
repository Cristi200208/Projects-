import React, { useContext, useEffect, useState } from "react";
import { loginUser } from "../api/methods/user";
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
      setUser(userCredentials as Users);
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
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <form
        className="flex flex-col justify-center items-center bg-white gap-3 p-5 rounded-lg w-[70%] h-[60%] shadow-xl"
        onSubmit={handleSubmit(onSubmitData)}
      >
        <h1 className="text-3xl">Log In</h1>
        <input
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[8%] text-center "
          {...register("email", {
            required: "Email Requiered",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Email Invalid Format",
            },
          })}
          type="email"
          placeholder="Email"
        />
        {errors.email ? (
          <span className="text-red-500">{errors.email.message}</span>
        ) : null}
        <input
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[8%] text-center "
          {...register("password", {
            required: "Password Requiered",
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password ? (
          <span className="text-red-500">{errors.password.message}</span>
        ) : null}
        <button className=" bg-black text-white w-[25%] h-[6%]  rounded-md  hover:bg-white hover:text-black border-2 border-black">
          Login
        </button>
        {error && <span className="text-red-500">{error}</span>}
        <Link className="hover:text-gray-500" to={"/register"}>
          No account ? Create One
        </Link>
      </form>
    </div>
  );
};

export default Login;
