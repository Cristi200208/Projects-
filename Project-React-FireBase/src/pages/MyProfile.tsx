import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContextProps, Users } from "../types/users";

import { AuthContext } from "../providers/AuthContext";
import { delleteUser, logoutUser, UpdateUser } from "../api/methods/user";
import { useNavigate } from "react-router";
import { IFlats } from "../types/flats";
import { delleteFlat, getAllFlats } from "../api/methods/flats";

const MyProfile: React.FC = (): JSX.Element => {
  const { user, setUser } = useContext(AuthContext) as AuthContextProps;
  const [flats, setFlats] = useState<IFlats[]>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Users>();

  const navigate = useNavigate();

  const flatsAdedUser = user?.flatsAdded;

  const flatsAded = flatsAdedUser?.map((flat) => flat.id);

  const fetchDataFlats = async () => {
    const fetchFlats: IFlats[] = await getAllFlats();
    setFlats(fetchFlats);
  };

  const updateUserEdit = async (data: Users) => {
    const updateUserCredentials = {
      ...user,
      uid: `${data.uid ? data.uid : user?.uid}`,
      firstName: `${data.firstName ? data.firstName : user?.firstName}`,
      lastName: `${data.lastName ? data.lastName : user?.lastName}`,
      email: `${data.email ? data.email : user?.email}`,
      age: Number(`${data.age ? data.age : user?.age}`),
    };
    await UpdateUser(updateUserCredentials as Users);
    setUser(updateUserCredentials as Users);
    alert("user Updated");
  };

  const deleteUserCredentials = async () => {
    try {
      if (flats === undefined || flatsAded === undefined) {
        return;
      }

      const updatedFlats = flats
        .filter((flat) => flatsAded.includes(flat.id))
        .map((updated) => updated.id);

      updatedFlats.forEach(async (id) => {
        await delleteFlat(id);
        alert("delete sucesful");
      });

      console.log(updatedFlats);

      await delleteUser(user as Users);
      await logoutUser();
      setUser(null);
      navigate("/register");
      alert("userDeleted");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFlats();
  }, []);

  return (
    <div className="flex mt-60  justify-center items-center w-[100%] h-[100%]">
      <form
        onSubmit={handleSubmit(updateUserEdit)}
        className="flex flex-col justify-center items-center gap-3 p-2 rounded-lg md:w-[50%] h-[100%] xxs:w-[100%] shadow-xl"
      >
        <h1 className="text-3xl">My Profile </h1>
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
          defaultValue={user?.firstName}
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
          defaultValue={user?.lastName}
        />
        {errors.lastName ? (
          <span className="text-red-500">{errors.lastName.message}</span>
        ) : null}
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[8%] text-center  bg-gray-500 cursor-pointer "
          defaultValue={user?.email}
          readOnly
        />
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
          defaultValue={user?.age}
        />
        {errors.age ? (
          <span className="text-red-500">{errors.age.message}</span>
        ) : null}
        <button className=" bg-black text-white w-[25%] h-[6%]  rounded-md  hover:bg-white hover:text-black border-2 border-black focus:bg-blue-600">
          Update Info
        </button>
        <button
          onClick={deleteUserCredentials}
          type="button"
          className=" bg-black text-white w-[25%] h-[6%]  rounded-md  hover:bg-red-500 hover:text-white border-2 border-black  focus:bg-red-800"
        >
          Dellete Account
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
