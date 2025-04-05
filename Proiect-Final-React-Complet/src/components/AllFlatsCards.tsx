import { useNavigate } from "react-router";
import { IFlats } from "../types/flats";
import { AuthContextProps, Users } from "../types/users";
import { AuthContext } from "../providers/AuthContext";
import { useContext, useEffect, useState } from "react";
import { UpdateUser } from "../api/methods/user";

const FlatsCards = ({
  data,
  onRemoveFavorite,
}: {
  data: IFlats;
  onRemoveFavorite?: (id: string) => void;
}): JSX.Element => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext) as AuthContextProps;
  const [isFavorite, setIsFavorite] = useState(false);
  const formatDate = (isoDate: string): string => {
    return isoDate.split("T")[0];
  };

  useEffect(() => {
    const result = user?.faovriteFlatList.find(
      (flat) => flat._id.toString() === data._id.toString()
    );
    console.log(result);
    if (result) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [data._id, user?.faovriteFlatList]);

  const addToFavorites = async (id: string) => {
    if (user?.faovriteFlatList.length) {
      const duplicate = user.faovriteFlatList.findIndex(
        (flat) => flat._id === id
      );
      if (duplicate !== -1) {
        user.faovriteFlatList[duplicate].quantity += 1;
        await UpdateUser(user as Users);
        setIsFavorite(true);
      } else {
        const newFlat = {
          _id: id,
          quantity: 1,
        };
        user?.faovriteFlatList.push(newFlat as IFlats);
        console.log(user?.faovriteFlatList);
        await UpdateUser(user as Users);
        setUser(user);
        setIsFavorite(true);
      }
    } else {
      const newFlat = {
        _id: id,
        quantity: 1,
      };
      user?.faovriteFlatList.push(newFlat as IFlats);
      console.log(user?.faovriteFlatList);
      await UpdateUser(user as Users);
      setUser(user);
      setIsFavorite(true);
    }
  };

  const removeFavorites = async (id: string) => {
    const duplicate = user?.faovriteFlatList.findIndex(
      (flat) => flat._id === id
    );

    if (duplicate !== -1) {
      user?.faovriteFlatList.splice(duplicate as number, 1);
      await UpdateUser(user as Users);
      setUser(user as Users);
      setIsFavorite(false);
      if (onRemoveFavorite) {
        onRemoveFavorite(id);
      }
    }
  };

  const aboutFlats = (_id: string) => {
    navigate(`/about-flat/${_id}`);
  };

  return (
    <div className="flex gap-5 bg-white shadow-lg md:flex-row xxs:flex-col border-gray-300 border-2 rounded-lg">
      <span className="flex justify-center items-center bg-gray-200 w-full md:w-[20%] h-64">
        <p className="text-gray-500 italic">No Image</p>
      </span>

      <div className="flex flex-col w-full gap-4 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-blue-500 font-semibold text-lg">
            Added By: {data.firstName}
          </h1>
          <div className="flex flex-col items-end">
            <p className="text-blue-500 font-bold text-lg">
              {data.rentPrice} EUR
            </p>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => aboutFlats(data._id)}
                className="bg-black text-white px-4 py-2 rounded-md hover:opacity-80 w-full"
              >
                Show More
              </button>

              {isFavorite ? (
                <button
                  onClick={() => removeFavorites(data._id)}
                  className="flex items-center bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 10C5.343 10 4 11.343 4 13C4 14.657 5.343 16 7 16H17C18.657 16 20 14.657 20 13C20 11.343 18.657 10 17 10H7ZM7 12H17C17.553 12 18 12.447 18 13C18 13.553 17.553 14 17 14H7C6.447 14 6 13.553 6 13C6 12.447 6.447 12 7 12Z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => addToFavorites(data._id)}
                  className="flex items-center bg-yellow-500 text-white p-2 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h2 className="font-medium text-gray-700">City:</h2>
            <p className="text-gray-600">{data.city}</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-700">Street:</h2>
            <p className="text-gray-600">
              {data.streetName}, {data.streetNumber}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700">
              <strong>Year Built:</strong> {data.yearBuilt}
            </p>
            <p className="text-gray-700">
              <strong>Available From:</strong> {formatDate(data.dataAvailable)}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <strong>Area Size:</strong> {data.areaSize}m<sup>2</sup>
            </p>
            <p className="text-gray-700">
              <strong>Has AC?</strong> {data.hasAc ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatsCards;
