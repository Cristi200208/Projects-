import { useNavigate } from "react-router";
import { IFlats } from "../types/flats";
import { AuthContextProps, Users } from "../types/users";
import { AuthContext } from "../providers/AuthContext";
import { useContext } from "react";
import { UpdateUser } from "../api/methods/user";
import { delleteFlat } from "../api/methods/flats";

const MyFlatsCards = ({
  data,
}: {
  data: IFlats;
  onRemoveMyFlat: (id: string) => void;
}): JSX.Element => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext) as AuthContextProps;

  const aboutFlats = (id: string) => {
    navigate(`/about-flat/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-flat/${id}`);
  };

  const removeFavorites = async (id: string) => {
    const updateFlats = user?.flatsAdded.filter((flat) => flat.id !== id);
    const updateFlatsFavorite = user?.favorite.filter((flat) => flat.id !== id);
    setUser({
      ...user,
      favorite: updateFlatsFavorite,
      flatsAdded: updateFlats,
    } as Users);

    await delleteFlat(id);
    await UpdateUser({
      ...user,
      favorite: updateFlatsFavorite,
      flatsAdded: updateFlats,
    } as Users);

    if (onRemoveMyFlat) {
      onRemoveMyFlat(id);
    }
  };

  return (
    <div className="flex gap-5 bg-white shadow-lg p-3 md:flex-row xxs:flex-col border-gray-300 border-2 ">
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
          <h1 className=" text-blue-500">Added By: {data.firstName}</h1>
          <p className=" text-blue-500">{data.rentPrice} EUR</p>
        </div>
        <div className="flex gap-5 ">
          <h2>City : {data.city}</h2>
          <p>Street Name: {data.streetName}</p>
          <p>Street Number: {data.streetNumber}</p>
        </div>
        <div className="flex gap-8 w-[100%] ">
          <div className="flex gap-5 w-[70%]">
            <p>Year Built: {data.yearBuilt}</p>
            <p>Avaialble From: {data.dataAvailable}</p>
          </div>
          <div className="flex md:flex-row xxs:flex-col gap-5 justify-evenly w-[100%]">
            <p>
              Area Size: {data.areaSize}m<sup>2</sup>
            </p>
            <p>Has AC ? {data.hasAc}</p>
            <div className="flex md:flex-col xxs:flex-col gap-2 ">
              <button
                onClick={() => handleEdit(data.id)}
                className="bg-black text-white p-1 rounded-md hover:opacity-80"
              >
                Edit
              </button>
              <button
                onClick={() => removeFavorites(data.id)}
                className="bg-black text-white p-1 rounded-md hover:opacity-80"
              >
                Remove
              </button>{" "}
              <button
                onClick={() => aboutFlats(data.id)}
                className="bg-black text-white p-1 rounded-md hover:opacity-80"
              >
                Show More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFlatsCards;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onRemoveMyFlat(id: string) {
  throw new Error("Function not implemented.");
}
