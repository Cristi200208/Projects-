import React, { useContext, useEffect, useState } from "react";
import { AuthContextProps } from "../types/users";
import { AuthContext } from "../providers/AuthContext";
import MyFlatsCards from "../components/MyFlatsCards";
import { IFlats } from "../types/flats";
import { getAllFlats } from "../api/methods/flats";

const MyFlats: React.FC = (): JSX.Element => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [myFlat, setMyFlat] = useState<IFlats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMyFlat = async () => {
    if (user && user._id) {
      try {
        const allFlats = await getAllFlats();
        console.log("All flats:", allFlats);

        const filteredFlats = allFlats.filter(
          (flat: IFlats) => flat.userId.toString() === user._id.toString()
        );

        console.log("Filtered flats:", filteredFlats);

        setMyFlat(filteredFlats);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemove = (id: string) => {
    setMyFlat((prevFlat) => prevFlat.filter((flat) => flat._id !== id));
  };

  useEffect(() => {
    if (user && user._id) {
      fetchMyFlat();
    } else {
      console.log("User is not available yet");
    }
  }, [user]);

  if (loading) {
    return (
      <span className="flex justify-center items-center text-3xl w-[100%] h-[90%]">
        Loading your flats......
      </span>
    );
  }

  if (!myFlat.length) {
    return (
      <span className="flex justify-center items-center text-3xl font-semibold text-gray-700 w-full h-auto mt-4 border-b-4 border-blue-400 p-4 bg-gray-50 shadow-md rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out">
        No flats Added
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-7 py-10 2xl:px-[25%] xl:px-80 lg:px-40 md:px-20 sm:px-10 xxs:px-4">
      <h1 className="flex justify-center items-center text-4xl font-bold text-gray-800 border-b-4 border-blue-500 p-5 shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out">
        My Flats
      </h1>
      {myFlat.map((flat) =>
        flat && flat._id ? (
          <MyFlatsCards
            key={flat._id}
            data={flat}
            onRemoveMyFlat={handleRemove}
          />
        ) : null
      )}
    </div>
  );
};

export default MyFlats;
