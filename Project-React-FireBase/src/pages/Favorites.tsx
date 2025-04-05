import React, { useContext, useEffect, useState } from "react";
import { AuthContextProps } from "../types/users";
import { AuthContext } from "../providers/AuthContext";
import { IFlats } from "../types/flats";
import { getFlat } from "../api/methods/flats";
import FlatsCards from "../components/AllFlatsCards";

const Favorites: React.FC = (): JSX.Element => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [favoriteFlat, setFavoriteFlat] = useState<IFlats[]>([]);
  const [favoriteFlatsCheck, setFavoriteFlatsCheck] = useState(false);
  const [autoRerender, setAutoRerender] = useState(0);

  const fetchFavorieFlat = async () => {
    const flats: IFlats[] = [];

    if (user && user.favorite) {
      const flatsMaped = user.favorite.map((flat: IFlats) => getFlat(flat.id));
      const flatData = await Promise.all(flatsMaped);

      const validFlats = flatData.filter(
        (flat) => flat !== undefined && flat && flat.id
      );

      if (validFlats.length === 0) {
        setFavoriteFlatsCheck(true);
      } else {
        flats.push(...(flatData as IFlats[]));
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
      prevFlat.filter((flat) => flat && flat.id !== id)
    );

    setAutoRerender((rerender) => rerender + 1);
  };

  useEffect(() => {
    fetchFavorieFlat();
    if (user?.flatsAdded.length === 1) {
      fetchFavorieFlat();
    }
  }, [user, autoRerender]);

  if (favoriteFlatsCheck) {
    return (
      <span className="flex justify-center items-center text-3xl w-[100%] h-[90%] mt-2 border-b-2 border-gray-400 p-2">
        No Favorite Flats Added
      </span>
    );
  }
  return (
    <div className="flex flex-col gap-7 py-10 2xl:px-[25%] xl:px-80 lg:px-40 md:px-20 sm:px-10 xxs:px-4">
      <h1 className="flex justify-center items-center text-3xl border-b-2 border-gray-400 p-2">
        Favorites
      </h1>
      {favoriteFlat?.map((flat) =>
        flat && flat.id ? (
          <FlatsCards
            key={flat.id}
            data={flat}
            onRemoveFavorite={handleRemove}
          />
        ) : null
      )}
    </div>
  );
};

export default Favorites;
