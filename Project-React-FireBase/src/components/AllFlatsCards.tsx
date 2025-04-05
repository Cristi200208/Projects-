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

  console.log(data);

  useEffect(() => {
    const result = user?.favorite.find((flat) => flat.id === data.id);

    if (result) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [data.id, user?.favorite]);

  const addToFavorites = async (id: string) => {
    if (user?.favorite.length) {
      const duplicate = user.favorite.findIndex((flat) => flat.id === id);
      if (duplicate !== -1) {
        user.favorite[duplicate].quantity += 1;
        await UpdateUser(user as Users);
        setUser(user);
        setIsFavorite(true);
      } else {
        const newFlat = {
          id: id,
          quantity: 1,
        };
        user?.favorite.push(newFlat as IFlats);
        console.log(user?.favorite);
        await UpdateUser(user as Users);
        setUser(user);
        setIsFavorite(true);
      }
    } else {
      const newFlat = {
        id: id,
        quantity: 1,
      };
      user?.favorite.push(newFlat as IFlats);
      console.log(user?.favorite);
      await UpdateUser(user as Users);
      setUser(user);
      setIsFavorite(true);
    }
  };

  const removeFavorites = async (id: string) => {
    const duplicate = user?.favorite.findIndex((flat) => flat.id === id);
    if (duplicate !== -1) {
      user?.favorite.splice(duplicate as number, 1);
      await UpdateUser(user as Users);
      setUser(user as Users);
      setIsFavorite(false);
      if (onRemoveFavorite === undefined) {
        return;
      }
      onRemoveFavorite(id);
    }
    return;
  };

  const aboutFlats = (id: string) => {
    navigate(`/about-flat/${id}`);
  };

  return (
    <div className="flex gap-5 bg-white shadow-lg p-3 md:flex-row xxs:flex-col border-gray-300 border-2">
      {!data.imageUrl ? (
        <span className=" flex justify-center items-center bg-gray-300 w-[20%]">
          No Image
        </span>
      ) : (
        <div className="flex justify-center items-center md:w-[20%] xxs:w-[100%] ">
          <img
            className="2xl:w-[100%] xl:w-[100%] lg:w-[100%] md:w-[100%] xxs:w-[50%]"
            src={data.imageUrl}
          />
        </div>
      )}
      <div className="flex flex-col w-[100%] gap-3">
        <div className="flex justify-between">
          <div>
            <h1 className=" text-blue-500">Added By: {data.firstName}</h1>
            <h1 className=" text-blue-500">Contact: {data.email}</h1>
          </div>

          <div className="flex justify-center items-center gap-2">
            <p className=" text-blue-500 text-lg">{data.rentPrice} EUR</p>
            {isFavorite ? (
              <button
                onClick={() => removeFavorites(data.id)}
                className="flex justify-center items-center bg-white  p-1 rounded-md hover:opacity-80 hover:scale-125"
              >
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g transform="translate(0 -1028.4)">
                    <path
                      d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
                      fill="#e74c3c"
                    />
                  </g>
                </svg>
              </button>
            ) : (
              <button
                onClick={() => addToFavorites(data.id)}
                className="flex justify-center items-center bg-white p-1 rounded-md hover:opacity-80 hover:scale-125"
              >
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 15 15"
                  version="1.1"
                  id="heart"
                >
                  <path
                    d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75&#xA;&#x9;C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-5 ">
          <h2>City : {data.city}</h2>
          <p>Street Name: {data.streetName}</p>
          <p>Street Number: {data.streetNumber}</p>
        </div>
        <div className="flex gap-8 w-[100%] flex-wrap ">
          <div className="flex gap-5 w-[70%]">
            <p className=" flex justify-center items-center p-2 text-sm">
              Year Built {data.yearBuilt}
            </p>
            <p className=" flex justify-center items-center p-2 text-sm">
              Avaialble From {data.dataAvailable}
            </p>
          </div>
          <div className="flex gap-5 text-sm w-[100%] justify-center items-center ">
            <p className="text-center w-[60%]">
              Area Size: {data.areaSize}m<sup>2</sup>
            </p>
            <p className="text-center w-[60%]">Has AC ? {data.hasAc}</p>
            <div className="flex flex-col justify-center items-center p-2 w-[50%]">
              <button
                onClick={() => aboutFlats(data.id)}
                className="flex justify-center items-center text-sm bg-black text-white p-2 rounded-md hover:opacity-80 w-[100%]"
              >
                Show More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatsCards;
