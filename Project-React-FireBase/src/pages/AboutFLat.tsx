import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getFlat } from "../api/methods/flats";
import { IFlats } from "../types/flats";
import { AllUsers, AuthContextProps, Users } from "../types/users";
import { AuthContext } from "../providers/AuthContext";
import { getAllUsers, UpdateUser } from "../api/methods/user";
import { useForm } from "react-hook-form";

const AboutFLat: React.FC = (): JSX.Element => {
  const [flat, setFlat] = useState<IFlats>();
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [allUsers, setAllUsers] = useState<AllUsers[] | null>(null);
  const [filteredUser, setFilteredUser] = useState<Users>();
  const [flatSame, setFlatSame] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Users>();
  const { id } = useParams();
  const navigate = useNavigate();

  const userAddedFlats = user?.flatsAdded;

  console.log(filteredUser);

  const idComparer = () => {
    if (flat && userAddedFlats) {
      const isFlatComparer = userAddedFlats.some(
        (addedFlatId) => addedFlatId.id === flat.id
      );
      console.log(isFlatComparer);
      if (isFlatComparer) {
        setFlatSame(false);
      } else {
        setFlatSame(true);
      }
    }
  };

  const handleMessage = async (data: Users) => {
    const dateRightNow = new Date();

    const dateTimeRightNow = `${dateRightNow.getDate()}/${
      dateRightNow.getMonth() + 1
    }/${dateRightNow.getFullYear()} ${dateRightNow.getHours()}:${dateRightNow.getMinutes()}`;

    if (filteredUser?.messages) {
      filteredUser.messages.push({
        flat: flat,
        firstName: user?.firstName,
        dateTime: dateTimeRightNow,
        messages: data.messages,
      });
      await UpdateUser({
        ...filteredUser,
      } as Users);
    }
    alert("message sent");
  };

  const findFlat = () => {
    if (!allUsers || allUsers.length === 0 || !flat?.userUid) {
      return;
    }

    const indexFlat = allUsers.findIndex((user) => user.id === flat.userUid);

    if (indexFlat !== -1) {
      setFilteredUser(allUsers[indexFlat].data as Users);
    }
  };

  const fetchAllUsers = async () => {
    const users = await getAllUsers();
    setAllUsers(users);
    setLoading(false);
  };

  const fetchFlat = async (id: string) => {
    const result = await getFlat(id);
    setFlat(result as IFlats);
    setLoading(false);
  };

  useEffect(() => {
    fetchFlat(id as string);
    fetchAllUsers();
  }, [id, loading]);

  useEffect(() => {
    if (!loading) {
      idComparer();
      findFlat();
    }
  }, [flat, userAddedFlats]);

  return (
    <div className="flex justify-center items-center gap-7 p-4">
      <div className="flex flex-col  justify-center items-center  gap-5 bg-white shadow-lg p-4 w-[60%]  border-gray-300 border-2 rounded-md ">
        <div className="flex  justify-between w-[100%]">
          <div>
            <h1 className=" text-blue-500 text-lg">
              <span className="text-black">Added By: </span> {flat?.firstName}
            </h1>
            <h1 className=" text-blue-500 text-lg">
              <span className="text-black">Contact: </span>
              {flat?.email}
            </h1>
          </div>
          <p className=" text-red-500 text-2xl font-semibold">
            {flat?.rentPrice} EUR
          </p>
        </div>
        {!flat?.imageUrl ? (
          <span className=" flex justify-center items-center bg-gray-300 w-[50%] h-[400px]">
            No Image
          </span>
        ) : (
          <div className=" flex w-[100%]">
            <img src={flat?.imageUrl} />
          </div>
        )}
        <div className="flex flex-col w-[100%] gap-3">
          <div className="flex flex-col gap-5 ">
            <div className="flex justify-between  p-2">
              <h2>City</h2>
              <h2>{flat?.city}</h2>
            </div>
            <div className="flex justify-between bg-blue-100 p-2">
              <h2>Street Name</h2>
              <h2>{flat?.streetName}</h2>
            </div>
            <div className="flex justify-between  p-2">
              <h2>Street Number</h2>
              <h2>{flat?.streetNumber}</h2>
            </div>
          </div>
          <div className="flex flex-col w-[100%] ">
            <div className="flex  flex-col gap-2  p-2">
              <div className="flex justify-between  bg-blue-100 p-2">
                <h2>Year Built</h2>
                <h2>{flat?.yearBuilt}</h2>
              </div>
              <div className="flex justify-between  p-2">
                <h2>Avaialble From</h2>
                <h2>{flat?.dataAvailable}</h2>
              </div>

              <div className="flex justify-between  bg-blue-100 p-2">
                <h2>Area Size</h2>
                <h2>{flat?.areaSize}</h2>
              </div>
              <div className="flex justify-between  p-2">
                <h2>Has AC ?</h2>
                <h2>{flat?.hasAc}</h2>
              </div>
            </div>
            <div className="w-[100%]">
              <h1 className=" flex justify-center items-center bg-blue-100 p-2">
                Description
              </h1>
              {flat?.description.length === 0 ? (
                <span>No Description</span>
              ) : (
                <p className="  border-2 border-blue-100 p-2">
                  {flat?.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {flatSame ? (
        <div className="flex flex-col p-3 justify-between items-center  shadow-xl w-[35%]  border-gray-300 border-2 rounded-md h-[450px]">
          <div className="flex items-end w-[100%]">
            <button
              onClick={() => navigate("/")}
              className="bg-gray-400 text-white p-2 rounded-md hover:opacity-80 "
              type="button"
            >
              Back To Home
            </button>
          </div>

          <form
            className="flex flex-col gap-3 justify-center items-center w-[100%] h-[880%]"
            onSubmit={handleSubmit(handleMessage)}
          >
            <h1>Send a message</h1>
            <textarea
              {...register("messages", { required: "Message  Requiered" })}
              className=" border-2 overflow-auto border-gray-500 rounded-md w-[85%] h-[50%] text-center "
            ></textarea>
            {errors.messages ? (
              <span className="text-red-500">{errors.messages.message}</span>
            ) : null}
            <button className="bg-black text-white p-2 rounded-md hover:opacity-80 w-[40%] h-[13%]">
              Send
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default AboutFLat;
