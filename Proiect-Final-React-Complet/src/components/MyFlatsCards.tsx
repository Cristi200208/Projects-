import { useNavigate } from "react-router";
import { IFlats } from "../types/flats";
import { AuthContextProps, Users } from "../types/users";
import { AuthContext } from "../providers/AuthContext";
import { useContext, useState } from "react";
import { delleteFlat } from "../api/methods/flats";
import { UpdateUser } from "../api/methods/user";

const MyFlatsCards = ({
  data,
  onRemoveMyFlat,
}: {
  data: IFlats;
  onRemoveMyFlat: (id: string) => void;
}): JSX.Element => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext) as AuthContextProps;
  const [showMessage, setShowMessage] = useState(false);

  const formatDate = (isoDate: string): string => {
    return isoDate.split("T")[0];
  };

  const aboutFlats = (_id: string) => {
    navigate(`/about-flat/${_id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-flat/${id}`);
  };

  const removeFavorites = async (id: string) => {
    const updateFlatsFavorite = user?.faovriteFlatList.filter(
      (flat) => flat._id !== id
    );
    setUser({
      ...user,
      faovriteFlatList: updateFlatsFavorite,
    } as Users);

    await delleteFlat(id);
    await UpdateUser({
      ...user,
      faovriteFlatList: updateFlatsFavorite,
    } as Users);

    if (onRemoveMyFlat) {
      onRemoveMyFlat(id);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden">
        <span className="flex justify-center items-center bg-gray-200 w-full md:w-[20%] h-64">
          <p className="text-gray-500 italic">No Image</p>
        </span>

        <div className="flex flex-col w-full p-6 gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-blue-500 font-semibold text-lg">
              Added By: {data.firstName}
            </h1>
            <p className="text-blue-500 font-bold text-lg">
              {data.rentPrice} EUR
            </p>
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
                <strong>Available From:</strong>{" "}
                {formatDate(data.dataAvailable)}
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

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleEdit(data._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => removeFavorites(data._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Remove
            </button>
            <button
              onClick={() => aboutFlats(data._id)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Show More
            </button>
            <button
              onClick={() => setShowMessage(!showMessage)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
            >
              {showMessage
                ? "Hide Messages"
                : `Show Messages ${data.messages?.length}`}
            </button>
          </div>
        </div>
      </div>

      {showMessage && (
        <div className="bg-gray-50 shadow-md border border-gray-300 rounded-lg p-4">
          {data?.messages && data.messages.length > 0 ? (
            <ul className="space-y-4">
              {data.messages.map((message, index) => (
                <li
                  key={index}
                  className="p-3 border border-gray-200 rounded-lg bg-white shadow-sm"
                >
                  <p className="text-gray-800 font-medium">
                    <strong className="text-blue-500">
                      {message.firstName}:
                    </strong>{" "}
                    {message.messageText}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Sent: {new Date(message.timeStamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 italic">
              <p>No messages available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyFlatsCards;
