import React, { useContext, useEffect, useState } from "react";
import { AuthContextProps } from "../types/users";
import { AuthContext } from "../providers/AuthContext";
import { IFlats } from "../types/flats";
import { getFlatsById } from "../api/methods/flats";
import FlatsCards from "../components/AllFlatsCards";

const Favorites: React.FC = (): JSX.Element => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [favoriteFlat, setFavoriteFlat] = useState<IFlats[]>([]);
  const [favoriteFlatsCheck, setFavoriteFlatsCheck] = useState(false);
  const [autoRerender, setAutoRerender] = useState(0);

  const fetchFavorieFlat = async () => {
    const flats: IFlats[] = [];

    if (user && user.faovriteFlatList) {
      const flatsMapped = user.faovriteFlatList.map((flat) =>
        getFlatsById(flat._id)
      );
      const flatData = await Promise.all(flatsMapped);

      console.log(favoriteFlat);

      const validFlats = flatData.filter(
        (flat) => flat !== undefined && flat && flat.id
      );

      if (validFlats.length !== 0) {
        setFavoriteFlatsCheck(true);
      } else {
        flats.push(...(flatData as IFlats[]));
        console.log(flats);

        setFavoriteFlat(flats);
        setFavoriteFlatsCheck(false);
        console.log(flatData);
      }
    } else {
      setFavoriteFlatsCheck(true);
    }
  };

  const handleRemove = (id: string) => {
    setFavoriteFlat((prevFlat) =>
      prevFlat.filter((flat) => flat && flat._id !== id)
    );

    setAutoRerender((rerender) => rerender + 1);
  };

  useEffect(() => {
    fetchFavorieFlat();
  }, [user, autoRerender]);

  if (favoriteFlatsCheck) {
    return (
      <span className="flex justify-center items-center text-3xl font-semibold text-gray-700 w-full h-auto mt-4 border-b-4 border-blue-400 p-4 bg-gray-50 shadow-md rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out">
        No Favorites Flats
      </span>
    );
  }
  return (
    <div className="flex flex-col gap-7 py-10 2xl:px-[25%] xl:px-80 lg:px-40 md:px-20 sm:px-10 xxs:px-4">
      <h1 className="flex justify-center items-center text-4xl font-bold text-gray-800 border-b-4 border-blue-500 p-5 shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out">
        Favorites
      </h1>
      {favoriteFlat?.map((flat) =>
        flat && flat._id ? (
          <FlatsCards
            key={flat._id}
            data={flat}
            onRemoveFavorite={handleRemove}
          />
        ) : null
      )}
    </div>
  );
};

export default Favorites;
