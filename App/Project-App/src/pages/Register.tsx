import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/methods/user";
import { Users } from "../types/users";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

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
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.status === 400 && error.response.data.message) {
            const errorMessage = error.response.data.message;

            if (
              errorMessage.includes("E11000") &&
              errorMessage.includes("dup key ")
            ) {
              setError(
                "This Email is already in use. Please try a different email."
              );
            } else {
              setError("An error occurred, please try again.");
            }
          } else {
            setError("An error occurred. Please try again.");
          }
        } else if (error.request) {
          setError("No response from the server. Please try again later.");
        } else {
          setError("An unexpected error occurred.");
        }
      } else if (error instanceof Error) {
        setError("This Email is already in use. Please try a different email.");
      }
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loggedUser") as string)) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <form
        className="flex flex-col justify-center items-center bg-white gap-6 p-8 rounded-lg w-[90%] sm:w-[70%] md:w-[50%] shadow-2xl"
        onSubmit={handleSubmit(onSubmitData)}
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Register</h1>

        <input
          {...register("firstName", {
            required: "First Name Required",
            minLength: { value: 2, message: "Minimum 2 Characters required" },
            maxLength: { value: 50, message: "Maximum 50 Characters allowed" },
          })}
          type="text"
          placeholder="First Name"
          className="border-2 border-gray-300 rounded-md w-[80%] h-12 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3"
        />
        {errors.firstName && (
          <span className="text-red-500">{errors.firstName.message}</span>
        )}

        <input
          {...register("lastName", {
            required: "Last Name Required",
            minLength: { value: 2, message: "Minimum 2 Characters required" },
            maxLength: { value: 50, message: "Maximum 50 Characters allowed" },
          })}
          type="text"
          placeholder="Last Name"
          className="border-2 border-gray-300 rounded-md w-[80%] h-12 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3"
        />
        {errors.lastName && (
          <span className="text-red-500">{errors.lastName.message}</span>
        )}

        <input
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
          className="border-2 border-gray-300 rounded-md w-[80%] h-12 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <input
          {...register("password", {
            required: "Password Required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
              message:
                "Password must contain at least 1 uppercase letter, 1 number, and 1 special character.",
            },
          })}
          type="password"
          placeholder="Password"
          className="border-2 border-gray-300 rounded-md w-[80%] h-12 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <input
          {...register("birthDate", {
            required: "Age Required",
            pattern: {
              value: /^\S[0-9]{0,3}$/,
              message: "Invalid Age",
            },
            validate: {
              minAge: (value) =>
                value >= 18 || "You must be at least 18 years old",
              maxAge: (value) => value <= 110 || "Age cannot exceed 110 years",
            },
          })}
          type="number"
          placeholder="Age"
          className="border-2 border-gray-300 rounded-md w-[80%] h-12 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3"
        />
        {errors.birthDate && (
          <span className="text-red-500">{errors.birthDate.message}</span>
        )}

        <button
          type="submit"
          className="bg-black text-white w-[60%] h-12 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
        >
          Register
        </button>

        {error && <span className="text-red-500">{error}</span>}

        <Link
          to="/login"
          className="text-blue-500 hover:text-blue-700 mt-4 text-sm"
        >
          Have an account? Login Here
        </Link>
      </form>
    </div>
  );
};

export default Register;
