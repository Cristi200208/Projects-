import React, { useEffect, useState } from "react";
import { delleteUser, getUserData, UpdateUser } from "../../api/methods/user";
import { Users } from "../../types/users";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { IFlats } from "../../types/flats";
import { delleteFlat, getAllFlats } from "../../api/methods/flats";

const EditSelectedUser: React.FC = (): JSX.Element => {
  const [selectedUser, setSelectedUser] = useState<Users | null>();
  const [flats, setFlats] = useState<IFlats[]>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Users>();

  console.log(selectedUser);

  const { id } = useParams();

  const navigate = useNavigate();

  const flatsAdedUser = selectedUser?.flatsAdded;

  const flatsAded = flatsAdedUser?.map((flat) => flat.id);

  console.log(flats);

  const fetchDataFlats = async () => {
    const fetchFlats: IFlats[] = await getAllFlats();
    setFlats(fetchFlats);
  };

  const fetchUser = async (id: string) => {
    const result = await getUserData(id);
    setSelectedUser(result as Users);
  };

  const updateUserEdit = async (data: Users) => {
    const updateUserCredentials = {
      ...selectedUser,
      uid: `${data.uid ? data.uid : selectedUser?.uid}`,
      firstName: `${data.firstName ? data.firstName : selectedUser?.firstName}`,
      lastName: `${data.lastName ? data.lastName : selectedUser?.lastName}`,
      email: `${data.email ? data.email : selectedUser?.email}`,
      age: Number(`${data.age ? data.age : selectedUser?.age}`),
      role: `${data.role ? data.role : selectedUser?.role}`,
    };
    await UpdateUser(updateUserCredentials as Users);
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

      await delleteUser(selectedUser as Users);
      setSelectedUser(null);
      navigate("/all-users-admin");
      alert("userDeleted");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser(id as string);
    fetchDataFlats();
  }, []);

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <form
        className="flex flex-col justify-center items-center gap-3 p-2 rounded-lg md:w-[50%] h-[90%] xxs:w-[100%] shadow-xl"
        onSubmit={handleSubmit(updateUserEdit)}
      >
        <h1 className="text-3xl"> Edit Profile </h1>
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
          defaultValue={selectedUser?.firstName}
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
          defaultValue={selectedUser?.lastName}
        />
        {errors.lastName ? (
          <span className="text-red-500">{errors.lastName.message}</span>
        ) : null}
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className=" border-2 border-gray-300 rounded-md w-[60%] h-[8%] text-center  bg-gray-500 cursor-pointer "
          defaultValue={selectedUser?.email}
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
          defaultValue={selectedUser?.age}
        />
        {errors.age ? (
          <span className="text-red-500">{errors.age.message}</span>
        ) : null}
        <div className="flex gap-3 justify-center items-center w-[100%]">
          <label>Change role</label>
          <select
            {...register("role", {
              required: "Age Requiered",
            })}
            className=" border-2 border-gray-300 rounded-md w-[15%] h-[35px] text-center "
          >
            <option>Chose</option>
            <option value="regular">Regular </option>
            <option value="admin">Admin </option>
          </select>
          <h1>Actual: {selectedUser?.role}</h1>
        </div>
        {errors.role ? (
          <span className="text-red-500">{errors.role.message}</span>
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

export default EditSelectedUser;
