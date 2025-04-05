import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContextProps, Users } from "../types/users";

import { AuthContext } from "../providers/AuthContext";
import { delleteUser, logoutUser, UpdateUser } from "../api/methods/user";
import { useNavigate } from "react-router";

const MyProfile: React.FC = (): JSX.Element => {
  const { user, setUser } = useContext(AuthContext) as AuthContextProps;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Users>();

  const navigate = useNavigate();

  const updateUserEdit = async (data: Users) => {
    const updateUserCredentials = {
      ...user,
      uid: `${data._id ?? user?._id}`,
      firstName: `${data.firstName ?? user?.firstName}`,
      lastName: `${data.lastName ?? user?.lastName}`,
      email: `${data.email ?? user?.email}`,
      age: `${data.birthDate ?? user?.birthDate}`,
    };

    try {
      const updatedUser = await UpdateUser(updateUserCredentials as Users);

      setUser(updatedUser);

      alert("User updated succesfully");
    } catch (error) {
      console.error("Error updating user:", error);
      alert(`Failed to update user:${(error as Error).message}`);
    }
  };

  const deleteUserCredentials = async () => {
    try {
      const response = await delleteUser(user as Users);
      console.log(response);
      await logoutUser();
      setUser(null);
      navigate("/register");
      alert("User and their flats deleted successfuly ");
    } catch (error) {
      console.error("Error deleting user and flats:", error);
      alert("Failed to delete user. Please try again");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full mt-24">
      <form
        onSubmit={handleSubmit(updateUserEdit)}
        className="flex flex-col justify-center items-center gap-4 p-6 rounded-xl shadow-xl bg-white w-full md:w-[50%] xxs:w-[90%]"
      >
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">
          My Profile
        </h1>

        <input
          {...register("firstName", {
            required: "First Name is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters required",
            },
            maxLength: {
              value: 50,
              message: "Maximum 50 characters allowed",
            },
          })}
          type="text"
          placeholder="First Name"
          className="w-[60%] h-[45px] p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={user?.firstName}
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm">
            {errors.firstName.message}
          </span>
        )}

        <input
          {...register("lastName", {
            required: "Last Name is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters required",
            },
            maxLength: {
              value: 50,
              message: "Maximum 50 characters allowed",
            },
          })}
          type="text"
          placeholder="Last Name"
          className="w-[60%] h-[45px] p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={user?.lastName}
        />
        {errors.lastName && (
          <span className="text-red-500 text-sm">
            {errors.lastName.message}
          </span>
        )}

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-[60%] h-[45px] p-3 border-2 border-gray-300 rounded-md shadow-md bg-gray-100 cursor-not-allowed"
          defaultValue={user?.email}
          readOnly
        />

        <input
          {...register("birthDate", {
            required: "Age is required",
            pattern: {
              value: /^\S[0-9]{0,3}$/,
              message: "Age is invalid",
            },
            validate: {
              minAge: (value) =>
                value >= 18 || "You must be at least 18 years old",
              maxAge: (value) => value <= 110 || "Age cannot exceed 110 years",
            },
          })}
          type="number"
          placeholder="Age"
          className="w-[60%] h-[45px] p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={user?.birthDate}
        />
        {errors.birthDate && (
          <span className="text-red-500 text-sm">
            {errors.birthDate.message}
          </span>
        )}
        <button
          type="submit"
          className="w-[50%] h-[45px] bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 mt-4"
        >
          Update Info
        </button>

        <button
          onClick={deleteUserCredentials}
          type="button"
          className="w-[50%] h-[45px] bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 mt-3"
        >
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
