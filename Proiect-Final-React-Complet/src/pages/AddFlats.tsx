import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps } from "../types/users";
import { useForm } from "react-hook-form";
import { IFlats } from "../types/flats";
import { addFlats } from "../api/methods/flats";
import { useNavigate } from "react-router";

const AddFlats: React.FC = (): JSX.Element => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFlats>();

  const navigate = useNavigate();

  const onSubmitData = async (data: IFlats) => {
    addFlats({
      ...data,
    });

    navigate("/");
  };

  return (
    <div className="flex mt-10 justify-center items-center w-full h-full bg-gradient-to-r from-blue-500 to-teal-500 p-5">
      <form
        className="flex flex-col justify-center items-center gap-6 bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg"
        onSubmit={handleSubmit(onSubmitData)}
      >
        <h1 className="text-3xl font-bold text-gray-800">Add Flat</h1>

        <input
          {...register("firstName")}
          type="text"
          placeholder="First Name"
          className="w-full px-4 py-2 border-2 bg-gray-100 text-gray-700 border-gray-300 rounded-lg"
          defaultValue={user?.firstName}
          readOnly
        />

        <input
          {...register("city", {
            required: "City Required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters required",
            },
            maxLength: {
              value: 50,
              message: "Maximum 50 characters required",
            },
          })}
          type="text"
          placeholder="City"
          className="w-full px-4 py-2 border-2 bg-gray-100 text-gray-700 border-gray-300 rounded-lg"
        />
        {errors.city && (
          <span className="text-sm text-red-500">{errors.city.message}</span>
        )}

        <input
          {...register("streetName", {
            required: "Street Name Required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters required",
            },
            maxLength: {
              value: 50,
              message: "Maximum 50 characters required",
            },
          })}
          type="text"
          placeholder="Street Name"
          className="w-full px-4 py-2 border-2 bg-gray-100 text-gray-700 border-gray-300 rounded-lg"
        />
        {errors.streetName && (
          <span className="text-sm text-red-500">
            {errors.streetName.message}
          </span>
        )}

        <input
          {...register("streetNumber", {
            required: "Street Number Required",
            validate: {
              minAge: (value) => value >= 1 || "Invalid Number",
              maxAge: (value) => value <= 10000 || "Exceeds limit",
            },
          })}
          type="number"
          placeholder="Street Number"
          className="w-full px-4 py-2 border-2 bg-gray-100 text-gray-700 border-gray-300 rounded-lg"
        />
        {errors.streetNumber && (
          <span className="text-sm text-red-500">
            {errors.streetNumber.message}
          </span>
        )}

        <input
          {...register("areaSize", {
            required: "Area Size Required",
            validate: {
              minAge: (value) => value >= 5 || "Invalid Area Size",
              maxAge: (value) => value <= 5000 || "Exceeds limit",
            },
          })}
          type="number"
          placeholder="Area Size"
          className="w-full px-4 py-2 border-2 bg-gray-100 text-gray-700 border-gray-300 rounded-lg"
        />
        {errors.areaSize && (
          <span className="text-sm text-red-500">
            {errors.areaSize.message}
          </span>
        )}

        <div className="flex items-center gap-3 w-full">
          <label className="text-gray-700">Has AC?</label>
          <select
            {...register("hasAc")}
            className="px-4 py-2 border-2 bg-gray-100 text-gray-700 border-gray-300 rounded-lg w-full"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <input
          {...register("yearBuilt", {
            required: "Year Built Required",
            validate: {
              minAge: (value) => value >= 1850 || "Invalid Year",
              maxAge: (value) => value <= 2024 || "Exceeds limit",
            },
          })}
          type="number"
          placeholder="Year Built"
          className="w-full px-4 py-2 border-2 bg-gray-100 text-gray-700 border-gray-300 rounded-lg"
        />
        {errors.yearBuilt && (
          <span className="text-sm text-red-500">
            {errors.yearBuilt.message}
          </span>
        )}

        <input
          {...register("rentPrice", {
            required: "Rent Price Required",
            validate: {
              minAge: (value) => value >= 1 || "Invalid Price",
              maxAge: (value) => value <= 100000 || "Exceeds limit",
            },
          })}
          type="number"
          placeholder="Rent Price"
          className="w-full px-4 py-2 border-2 bg-gray-100 text-gray-700 border-gray-300 rounded-lg"
        />
        {errors.rentPrice && (
          <span className="text-sm text-red-500">
            {errors.rentPrice.message}
          </span>
        )}

        <label className="text-gray-700">Date Available</label>
        <input
          {...register("dataAvailable", { required: "Date Required" })}
          type="date"
          className="w-full px-4 py-2 border-2 bg-gray-100 text-gray-700 border-gray-300 rounded-lg"
        />
        {errors.dataAvailable && (
          <span className="text-sm text-red-500">
            {errors.dataAvailable.message}
          </span>
        )}

        <label className="text-gray-700">Description</label>
        <textarea
          {...register("description", { required: "Description Required" })}
          className="w-full px-4 py-2 border-2 bg-gray-100 text-gray-700 border-gray-300 rounded-lg resize-none h-24"
        ></textarea>
        {errors.description && (
          <span className="text-sm text-red-500">
            {errors.description.message}
          </span>
        )}

        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition-all duration-200">
          Add Flat
        </button>
      </form>
    </div>
  );
};

export default AddFlats;
