import React, { useContext, useEffect, useState } from "react";
import { AuthContextProps } from "../types/users";
import { AuthContext } from "../providers/AuthContext";
import MyFlatsCards from "../components/MyFlatsCards";
import { IFlats } from "../types/flats";
import { getFlat } from "../api/methods/flats";

const MyFlats: React.FC = (): JSX.Element => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [myFlat, setMyFlat] = useState<IFlats[]>([]);

  console.log(user?.flatsAdded);

  const fetchMyFlat = async () => {
    const flats: IFlats[] = [];

    if (user && user.flatsAdded) {
      const flatsMaped = user.flatsAdded.map((flat: IFlats) =>
        getFlat(flat.id)
      );
      const flatData = await Promise.all(flatsMaped);
      flats.push(...(flatData as IFlats[]));

      setMyFlat(flats);
    }
  };

  const handleRemove = (id: string) => {
    setMyFlat((prevFlat) => prevFlat.filter((flat) => flat.id !== id));
  };

  useEffect(() => {
    fetchMyFlat();
  }, [user]);

  if (!myFlat.length) {
    return (
      <span className="flex justify-center items-center text-3xl w-[100%] h-[90%]">
        No Flats Added
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-7 py-10 2xl:px-[25%] xl:px-80 lg:px-40 md:px-20 sm:px-10 xxs:px-4">
      <h1 className=" flex justify-center items-center text-3xl border-b-2 border-gray-400 p-2">
        My Flats
      </h1>
      {myFlat.map((flat) =>
        flat && flat.id ? (
          <MyFlatsCards
            key={flat.id}
            data={flat}
            onRemoveMyFlat={handleRemove}
          />
        ) : null
      )}
    </div>
  );
};

export default MyFlats;
