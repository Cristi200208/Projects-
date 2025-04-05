import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/methods/user";
import { Users } from "../types/users";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Users>();

  const navigate = useNavigate();

  const onSubmitData = async (data: Users) => {
    console.log(data);
    setError(null);
    try {
      await registerUser(data);
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (
          error.message.includes("Firebase: Error (auth/email-already-in-use).")
        ) {
          setError(
            "This Email is already in use. pleaste try a diferent email."
          );
        } else {
          setError("An error ocured,Try Again");
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
        <h1 className="text-3xl">Register </h1>
        <input
          {...register("firstName", {
            required: "First Name Requiered",
            minLength: {
              value: 2,
              message: "Minimum 2 Characters required",
            },
            maxLength: {
              value: 50,
              message: "Maxium 50 Characters required",
            },
          })}
          type="text"
          placeholder="First Name"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[8%] text-center "
        />
        {errors.firstName ? (
          <span className="text-red-500">{errors.firstName.message}</span>
        ) : null}
        <input
          {...register("lastName", {
            required: "Last Name Requiered",
            minLength: {
              value: 2,
              message: "Minimum 2 Characters required",
            },
            maxLength: {
              value: 50,
              message: "Maxium 50 Characters required",
            },
          })}
          type="text"
          placeholder="Last Name"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[8%] text-center "
        />
        {errors.lastName ? (
          <span className="text-red-500">{errors.lastName.message}</span>
        ) : null}
        <input
          {...register("email", {
            required: "Email Requiered",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Email Invalid Format",
            },
          })}
          type="text"
          placeholder="Email"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[8%] text-center "
        />
        {errors.email ? (
          <span className="text-red-500">{errors.email.message}</span>
        ) : null}
        {error && <span className="text-red-500">{error}</span>}
        <input
          {...register("password", {
            required: "Password Requiered",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
              message:
                "Password must contain this digits (a,A,0-9,@) and be atleast 8 letters long",
            },
          })}
          type="password"
          placeholder="Password"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[8%] text-center "
        />
        {errors.password ? (
          <span className="text-red-500">{errors.password.message}</span>
        ) : null}
        <input
          {...register("age", {
            required: "Age Requiered",
            pattern: {
              value: /^\S[0-9]{0,3}$/,
              message: "Age invalid",
            },
            validate: {
              minAge: (value) =>
                value >= 18 || "You must be at least 18 years old",
              maxAge: (value) => value <= 110 || "Age cannot exceed 110 years",
            },
          })}
          type="number"
          placeholder="Age"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[8%] text-center "
        />
        {errors.age ? (
          <span className="text-red-500">{errors.age.message}</span>
        ) : null}
        <button className=" bg-black text-white w-[25%] h-[6%]  rounded-md  hover:bg-white hover:text-black border-2 border-black">
          Register
        </button>
        <Link className="hover:text-gray-500" to={"/login"}>
          Have an account? Login Here
        </Link>
      </form>
    </div>
  );
};

export default Register;
