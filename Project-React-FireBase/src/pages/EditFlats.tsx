import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { IFlats } from "../types/flats";
import { useForm } from "react-hook-form";
import { addFlats, getFlat } from "../api/methods/flats";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps, Users } from "../types/users";
import { uploadImage } from "../api/methods/storage";
import { UpdateUser } from "../api/methods/user";

const EditFlats: React.FC = (): JSX.Element => {
  const { user, setUser } = useContext(AuthContext) as AuthContextProps;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFlats>();
  const [imagePrewiew, setImagePrewiew] = useState("");
  const [flat, setFlat] = useState<IFlats>();

  const { id } = useParams();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImagePrewiew(imageUrl);
  };

  const onSubmitData = async (data: IFlats) => {
    let imageUrl = "";
    if (data.image[0]) {
      imageUrl = await uploadImage(data.image[0]);
    } else {
      imageUrl = flat?.imageUrl as string;
    }
    if (flat?.id === undefined) {
      return;
    }

    addFlats({
      firstName: `${data.firstName ? data.firstName : flat?.firstName}`,
      email: `${data.email ? data.email : flat?.email}`,
      city: `${data.city ? data.city : flat?.city}`,
      dataAvailable: `${
        data.dataAvailable ? data.dataAvailable : flat?.dataAvailable
      }`,
      description: `${data.description ? data.description : flat?.description}`,
      id: flat?.id,
      hasAc: data.hasAc,
      streetName: `${data.streetName ? data.streetName : flat?.streetName}`,
      streetNumber: Number(
        `${data.streetNumber ? Number(data.streetNumber) : flat?.streetNumber}`
      ),
      areaSize: Number(
        `${data.areaSize ? Number(data.areaSize) : flat?.areaSize}`
      ),
      yearBuilt: Number(
        `${data.yearBuilt ? Number(data.yearBuilt) : flat?.yearBuilt}`
      ),
      rentPrice: Number(
        `${data.rentPrice ? Number(data.rentPrice) : flat?.rentPrice}`
      ),
      imageUrl: imageUrl,
      quantity: Number(`${data.quantity ? data.quantity : flat?.quantity}`),
    });

    if (user && user.flatsAdded) {
      const flatIndex = user.flatsAdded.findIndex(
        (flats) => flats.id === flat?.id
      );

      if (flatIndex !== -1) {
        const editMyFlat = {
          firstName: `${data.firstName ? data.firstName : flat?.firstName}`,
          email: `${data.email ? data.email : flat?.email}`,
          city: `${data.city ? data.city : flat?.city}`,
          dataAvailable: `${
            data.dataAvailable ? data.dataAvailable : flat?.dataAvailable
          }`,
          description: `${
            data.description ? data.description : flat?.description
          }`,
          id: flat?.id,
          hasAc: data.hasAc,
          streetName: `${data.streetName ? data.streetName : flat?.streetName}`,
          streetNumber: Number(
            `${
              data.streetNumber ? Number(data.streetNumber) : flat?.streetNumber
            }`
          ),
          areaSize: Number(
            `${data.areaSize ? Number(data.areaSize) : flat?.areaSize}`
          ),
          yearBuilt: Number(
            `${data.yearBuilt ? Number(data.yearBuilt) : flat?.yearBuilt}`
          ),
          rentPrice: Number(
            `${data.rentPrice ? Number(data.rentPrice) : flat?.rentPrice}`
          ),
          imageUrl: `${data.imageUrl ? data.imageUrl : flat?.imageUrl}`,
          quantity: Number(`${data.quantity ? data.quantity : flat?.quantity}`),
        };

        user.flatsAdded[flatIndex] = editMyFlat;

        await UpdateUser(user as Users);
        setUser(user);
      }
    } else {
      console.log("flat array undefined");
    }
  };

  const fetchFlat = async (id: string) => {
    const result = await getFlat(id);
    setFlat(result as IFlats);
    setImagePrewiew(result?.imageUrl);
  };

  useEffect(() => {
    fetchFlat(id as string);
  }, []);

  return (
    <div className="flex mt-3 justify-center items-center w-[100%] h-[100%]">
      <form
        className="flex flex-col justify-center items-center gap-3 p-2 rounded-lg md:w-[50%] h-[90%] xxs:w-[100%] shadow-xl"
        onSubmit={handleSubmit(onSubmitData)}
      >
        <h1 className=" text-3xl p-2"> Edit Flat</h1>
        <label>User Name</label>
        <input
          {...register("firstName")}
          type="text"
          placeholder="First Name"
          className=" border-2 border-gray-300 bg-gray-600 text-white rounded-md w-[60%] h-[15%] text-center "
          defaultValue={user?.firstName}
          readOnly
        />
        <label>City</label>
        <input
          {...register("city", {
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
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[15%] text-center "
          defaultValue={flat?.city}
        />
        {errors.city ? (
          <span className="text-red-500">{errors.city.message}</span>
        ) : null}
        <label>Street name</label>
        <input
          {...register("streetName", {
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
          defaultValue={flat?.streetName}
        />
        {errors.streetName ? (
          <span className="text-red-500">{errors.streetName.message}</span>
        ) : null}
        <label>Street number</label>
        <input
          {...register("streetNumber")}
          type="number"
          placeholder="Street number"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[15%] text-center "
          defaultValue={flat?.streetNumber}
        />
        {errors.streetNumber ? (
          <span className="text-red-500">{errors.streetNumber.message}</span>
        ) : null}
        <label>Area size</label>
        <input
          {...register("areaSize")}
          type="number"
          placeholder="Area size"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[15%] text-center "
          defaultValue={flat?.areaSize}
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
        <label>Year built</label>
        <input
          {...register("yearBuilt")}
          type="number"
          placeholder="Year built"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[15%] text-center "
          defaultValue={flat?.yearBuilt}
        />
        {errors.yearBuilt ? (
          <span className="text-red-500">{errors.yearBuilt.message}</span>
        ) : null}
        <label>Rent price</label>
        <input
          {...register("rentPrice")}
          type="number"
          placeholder="Rent price"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[15%] text-center "
          defaultValue={flat?.rentPrice}
        />
        {errors.rentPrice ? (
          <span className="text-red-500">{errors.rentPrice.message}</span>
        ) : null}
        <label>Date Available</label>
        <input
          {...register("dataAvailable")}
          type="date"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[15%] text-center "
          defaultValue={flat?.dataAvailable}
        />
        <label>Chose an Image</label>
        <input
          {...register("image")}
          type="file"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[15%] text-center "
          onChange={handleImageChange}
        />
        {imagePrewiew ? (
          <img src={imagePrewiew} alt="flat" className="w-24 h-188" />
        ) : null}
        <label>Description</label>
        <textarea
          {...register("description")}
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[50%] resize-none p-2 "
          defaultValue={flat?.description}
        />
        <button className=" bg-black text-white w-[25%] h-[6%]  rounded-md  hover:bg-white hover:text-black border-2 border-black">
          Edit Flat
        </button>
      </form>
    </div>
  );
};

export default EditFlats;
