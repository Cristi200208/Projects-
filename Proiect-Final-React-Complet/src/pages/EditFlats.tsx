import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IFlats } from "../types/flats";
import { useForm } from "react-hook-form";
import { getFlatsById, updateFlatsData } from "../api/methods/flats";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps } from "../types/users";

const EditFlats: React.FC = (): JSX.Element => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFlats>();

  const [flat, setFlat] = useState<IFlats>();
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(flat);

  const onSubmitData = async (data: IFlats) => {
    if (!flat?._id) {
      console.error("Flat ID is missing");
      return;
    }

    const updatedData = {
      _id: flat._id,
      firstName: data.firstName || flat?.firstName,
      city: data.city || flat?.city,
      streetName: data.streetName || flat?.streetName,
      streetNumber: data.streetNumber || flat?.streetNumber,
      areaSize: data.areaSize || flat?.areaSize,
      hasAc: data.hasAc || flat?.hasAc,
      yearBuilt: data.yearBuilt || flat?.yearBuilt,
      rentPrice: data.rentPrice || flat?.rentPrice,
      description: data.description || flat?.description,
      dataAvailable: data.dataAvailable || flat?.dataAvailable,
      quantity: flat?.quantity,
      userId: flat.userId,
    };

    try {
      const response = await updateFlatsData(id as string, updatedData);

      if (response.status === 200 || response.status === 201) {
        alert("Flat updated successfully!");
        navigate("/my-flats");
      }
    } catch (error) {
      console.error("Error updating flat:", error);
      alert("An error occurred while updating the flat");
    }
  };

  const fetchFlat = async (id: string) => {
    const result = await getFlatsById(id);
    setFlat(result as IFlats);
  };

  useEffect(() => {
    fetchFlat(id as string);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-400">
      <form
        className="flex flex-col justify-center items-center gap-6 bg-white p-6 rounded-lg shadow-2xl w-full max-w-xl"
        onSubmit={handleSubmit(onSubmitData)}
      >
        <h1 className="text-4xl font-bold text-gray-800 pb-4 border-b-2 w-full text-center">
          Edit Flat
        </h1>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            User Name
          </label>
          <input
            {...register("firstName")}
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-2 border bg-gray-100 text-gray-700 rounded-lg"
            defaultValue={user?.firstName}
            readOnly
          />
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">City</label>
          <input
            {...register("city", {
              minLength: { value: 2, message: "Minimum 2 Characters required" },
              maxLength: {
                value: 50,
                message: "Maximum 50 Characters required",
              },
            })}
            type="text"
            placeholder="City"
            className="w-full px-4 py-2 border bg-gray-100 text-gray-700 rounded-lg"
            defaultValue={flat?.city}
          />
          {errors.city && (
            <span className="text-sm text-red-500">{errors.city.message}</span>
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Street Name
          </label>
          <input
            {...register("streetName", {
              minLength: { value: 2, message: "Minimum 2 Characters required" },
              maxLength: {
                value: 50,
                message: "Maximum 50 Characters required",
              },
            })}
            type="text"
            placeholder="Street name"
            className="w-full px-4 py-2 border bg-gray-100 text-gray-700 rounded-lg"
            defaultValue={flat?.streetName}
          />
          {errors.streetName && (
            <span className="text-sm text-red-500">
              {errors.streetName.message}
            </span>
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Street Number
          </label>
          <input
            {...register("streetNumber")}
            type="number"
            placeholder="Street number"
            className="w-full px-4 py-2 border bg-gray-100 text-gray-700 rounded-lg"
            defaultValue={flat?.streetNumber}
          />
          {errors.streetNumber && (
            <span className="text-sm text-red-500">
              {errors.streetNumber.message}
            </span>
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Area Size
          </label>
          <input
            {...register("areaSize")}
            type="number"
            placeholder="Area size"
            className="w-full px-4 py-2 border bg-gray-100 text-gray-700 rounded-lg"
            defaultValue={flat?.areaSize}
          />
          {errors.areaSize && (
            <span className="text-sm text-red-500">
              {errors.areaSize.message}
            </span>
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Has AC?
          </label>
          <select
            {...register("hasAc")}
            className="w-full px-4 py-2 border bg-gray-100 text-gray-700 rounded-lg"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Year Built
          </label>
          <input
            {...register("yearBuilt")}
            type="number"
            placeholder="Year built"
            className="w-full px-4 py-2 border bg-gray-100 text-gray-700 rounded-lg"
            defaultValue={flat?.yearBuilt}
          />
          {errors.yearBuilt && (
            <span className="text-sm text-red-500">
              {errors.yearBuilt.message}
            </span>
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Rent Price
          </label>
          <input
            {...register("rentPrice")}
            type="number"
            placeholder="Rent price"
            className="w-full px-4 py-2 border bg-gray-100 text-gray-700 rounded-lg"
            defaultValue={flat?.rentPrice}
          />
          {errors.rentPrice && (
            <span className="text-sm text-red-500">
              {errors.rentPrice.message}
            </span>
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Date Available
          </label>
          <input
            {...register("dataAvailable")}
            type="date"
            className="w-full px-4 py-2 border bg-gray-100 text-gray-700 rounded-lg"
            defaultValue={flat?.dataAvailable}
          />
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 border bg-gray-100 text-gray-700 rounded-lg resize-none h-24"
            defaultValue={flat?.description}
          ></textarea>
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition-all duration-200">
          Edit Flat
        </button>
      </form>
    </div>
  );
};

export default EditFlats;
