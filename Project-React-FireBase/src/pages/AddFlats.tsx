import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps, Users } from "../types/users";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IFlats } from "../types/flats";
import { addFlats } from "../api/methods/flats";
import { UpdateUser } from "../api/methods/user";
import { uploadImage } from "../api/methods/storage";
import { useNavigate } from "react-router";

const AddFlats: React.FC = (): JSX.Element => {
  const { user, setUser } = useContext(AuthContext) as AuthContextProps;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFlats>();
  console.log(user?.flatsAdded);
  const id = uuidv4();
  const navigate = useNavigate();

  console.log(id);

  const onSubmitData = async (data: IFlats) => {
    const imageUrl = await uploadImage(data.image[0]);
    addFlats({
      firstName: data.firstName,
      email: data.email,
      city: data.city,
      dataAvailable: data.dataAvailable,
      description: data.description,
      id: id,
      hasAc: data.hasAc,
      streetName: data.streetName,
      streetNumber: Number(data.streetNumber),
      areaSize: Number(data.areaSize),
      yearBuilt: Number(data.yearBuilt),
      rentPrice: Number(data.rentPrice),
      imageUrl: imageUrl,
      quantity: Number(data.quantity),
      userUid: user?.uid as string,
    });
    const flatsAded = {
      firstName: data.firstName,
      email: data.email,
      city: data.city,
      dataAvailable: data.dataAvailable,
      description: data.description,
      id: id,
      hasAc: data.hasAc,
      streetName: data.streetName,
      streetNumber: Number(data.streetNumber),
      areaSize: Number(data.areaSize),
      yearBuilt: Number(data.yearBuilt),
      rentPrice: Number(data.rentPrice),
      imageUrl: imageUrl,
      quantity: Number(data.quantity),
    };
    user?.flatsAdded.push(flatsAded);
    await UpdateUser(user as Users);
    setUser(user);
    navigate("/");
  };

  return (
    <div className="flex mt-10 justify-center items-center w-[100%] h-[100%]">
      <form
        className="flex flex-col justify-center items-center gap-3 p-2 rounded-lg md:w-[50%] h-[90%] xxs:w-[100%] shadow-xl"
        onSubmit={handleSubmit(onSubmitData)}
      >
        <h1 className="text-2xl">Add Flats</h1>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className=" border-2 bg-gray-700 text-white border-gray-300 rounded-md w-[60%] h-[5%] text-center "
          defaultValue={user?.email}
          readOnly
        />
        <input
          {...register("firstName")}
          type="text"
          placeholder="First Name"
          className=" border-2  bg-gray-700 text-white border-gray-300 rounded-md w-[60%] h-[5%] text-center "
          defaultValue={user?.firstName}
          readOnly
        />
        <input
          {...register("city", {
            required: "City Requiered",
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
          placeholder="City"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[5%] text-center "
        />
        {errors.city ? (
          <span className="text-red-500">{errors.city.message}</span>
        ) : null}
        <input
          {...register("streetName", {
            required: "Street Name Requiered",
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
          placeholder="Street name "
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[5%] text-center "
        />
        {errors.streetName ? (
          <span className="text-red-500">{errors.streetName.message}</span>
        ) : null}
        <input
          {...register("streetNumber", {
            required: "Street Number Requiered",
            validate: {
              minAge: (value) => value >= 1 || "Not Number",
              maxAge: (value) => value <= 10000 || "Cannot execed limit",
            },
          })}
          type="number"
          placeholder="Street number"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[5%] text-center "
        />
        {errors.streetNumber ? (
          <span className="text-red-500">{errors.streetNumber.message}</span>
        ) : null}
        <input
          {...register("areaSize", {
            required: "Area Size Requiered",
            validate: {
              minAge: (value) => value >= 5 || "Area Size Invalid",
              maxAge: (value) =>
                value <= 5000 || "Cannot execed limit Area Size",
            },
          })}
          type="number"
          placeholder="Area size"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[5%] text-center "
        />
        {errors.areaSize ? (
          <span className="text-red-500">{errors.areaSize.message}</span>
        ) : null}
        <div className="flex gap-3 justify-center items-center w-[100%]">
          <label>Has AC ?</label>
          <select
            {...register("hasAc")}
            className=" border-2 border-gray-300 rounded-md w-[8%] h-[100%] text-center "
          >
            <option value="Yes">Yes </option>
            <option value="No">No </option>
          </select>
        </div>

        <input
          {...register("yearBuilt", {
            required: "Year built Requiered",
            validate: {
              minAge: (value) => value >= 1850 || "Year Invalid",
              maxAge: (value) => value <= 2024 || "Year Exceded",
            },
          })}
          type="number"
          placeholder="Year built"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[5%] text-center "
        />
        {errors.yearBuilt ? (
          <span className="text-red-500">{errors.yearBuilt.message}</span>
        ) : null}
        <input
          {...register("rentPrice", {
            required: "Rent Price Requiered",
            validate: {
              minAge: (value) => value >= 1 || "Not Number",
              maxAge: (value) => value <= 100000 || "Cannot execed limit Rent",
            },
          })}
          type="number"
          placeholder="Rent price "
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[5%] text-center "
        />
        {errors.rentPrice ? (
          <span className="text-red-500">{errors.rentPrice.message}</span>
        ) : null}
        <label>Date Available</label>
        <input
          {...register("dataAvailable", { required: "Date Requiered" })}
          type="date"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[5%] text-center "
        />
        {errors.dataAvailable ? (
          <span className="text-red-500">{errors.dataAvailable.message}</span>
        ) : null}
        <label> Add a photo </label>
        <input
          {...register("image", { required: "Image Requiered" })}
          type="file"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[5%] text-center "
        />
        {errors.image ? (
          <span className="text-red-500">{errors.image.message}</span>
        ) : null}
        <label>Description</label>
        <textarea
          {...register("description", { required: "Description Requiered" })}
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[15%] resize-none p-2 "
        />
        {errors.description ? (
          <span className="text-red-500">{errors.description.message}</span>
        ) : null}
        <button className=" bg-black text-white w-[25%] h-[6%]  rounded-md  hover:bg-white hover:text-black border-2 border-black">
          Add Flat
        </button>
      </form>
    </div>
  );
};

export default AddFlats;
