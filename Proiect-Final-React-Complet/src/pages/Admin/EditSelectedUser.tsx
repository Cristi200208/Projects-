import React, { useEffect, useState } from "react";
import { delleteUser, getUserById, UpdateUser } from "../../api/methods/user";
import { Users } from "../../types/users";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";

const EditSelectedUser: React.FC = (): JSX.Element => {
  const [selectedUser, setSelectedUser] = useState<Users | null>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Users>();

  console.log(selectedUser);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchUser = async (id: string) => {
    const result = await getUserById(id);
    setSelectedUser(result as Users);
  };

  const updateUserEdit = async (data: Users) => {
    const updateUserCredentials = {
      ...selectedUser,
      uid: `${data._id ?? selectedUser?._id}`,
      firstName: `${data.firstName ?? selectedUser?.firstName}`,
      lastName: `${data.lastName ?? selectedUser?.lastName}`,
      email: `${data.email ?? selectedUser?.email}`,
      birthDate: `${data.birthDate ?? selectedUser?.birthDate}`,
      isAdmin: data.isAdmin ?? selectedUser?.isAdmin,
    };

    try {
      await UpdateUser(updateUserCredentials as unknown as Users);

      alert("User updated succesfully");
      navigate("/all-users-admin");
    } catch (error) {
      console.error("Error updating user:", error);
      alert(`Failed to update user:${(error as Error).message}`);
    }
  };

  const deleteUserCredentials = async () => {
    try {
      const response = await delleteUser(selectedUser as Users);
      console.log(response);
      alert("User and their flats deleted successfuly ");
    } catch (error) {
      console.error("Error deleting user and flats:", error);
      alert("Failed to delete user. Please try again");
    }
  };

  useEffect(() => {
    fetchUser(id as string);
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-50">
      <form
        className="flex flex-col justify-center items-center gap-6 p-6 rounded-lg w-[90%] sm:w-[60%] lg:w-[50%] shadow-xl bg-white"
        onSubmit={handleSubmit(updateUserEdit)}
      >
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">
          Edit Profile
        </h1>

        <input
          {...register("firstName", {
            required: "First Name Required",
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
          defaultValue={selectedUser?.firstName}
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm">
            {errors.firstName.message}
          </span>
        )}

        <input
          {...register("lastName", {
            required: "Last Name Required",
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
          defaultValue={selectedUser?.lastName}
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
          className="w-[60%] h-[45px] p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={selectedUser?.email}
          readOnly
        />

        <input
          {...register("birthDate", {
            required: "Age Required",
            pattern: {
              value: /^\S[0-9]{0,3}$/,
              message: "Invalid age",
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
          defaultValue={selectedUser?.birthDate}
        />
        {errors.birthDate && (
          <span className="text-red-500 text-sm">
            {errors.birthDate.message}
          </span>
        )}

        <label htmlFor="role" className="text-lg font-semibold">
          Change Role
        </label>
        <select
          {...register("isAdmin", { required: "Role is required" })}
          id="role"
          className="w-[60%] h-[45px] p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="false">Regular</option>
          <option value="true">Admin</option>
        </select>
        <h1 className="text-gray-600 mt-2">
          Current Role: {selectedUser?.isAdmin ? "Admin" : "Regular"}
        </h1>
        {errors.isAdmin && (
          <span className="text-red-500 text-sm">{errors.isAdmin.message}</span>
        )}

        <button
          type="submit"
          className="bg-black text-white w-[40%] h-12 rounded-md text-lg hover:bg-white hover:text-black border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Info
        </button>
        <button
          type="button"
          onClick={deleteUserCredentials}
          className="bg-red-600 text-white w-[40%] h-12 rounded-md text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default EditSelectedUser;
