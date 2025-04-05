import React, { useEffect, useState } from "react";
import { Users } from "../types/users";
import { useNavigate } from "react-router";
import { getAllFlats } from "../api/methods/flats";
import { IFlats } from "../types/flats";

const AllUsersCard = ({ data }: { data: Users }): JSX.Element => {
  const [showMore, setShowMore] = useState(false);
  const [myFlat, setMyFlat] = useState<IFlats[]>([]);
  const navigate = useNavigate();

  const fetchMyFlat = async () => {
    if (data && data._id) {
      try {
        const allFlats = await getAllFlats();
        console.log("All flats:", allFlats);

        const filteredFlats = allFlats.filter(
          (flat: IFlats) => flat.userId.toString() === data._id.toString()
        );

        console.log("Filtered flats:", filteredFlats);

        setMyFlat(filteredFlats);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (data && data._id) {
      fetchMyFlat();
    } else {
      console.log("User is not available yet");
    }
  }, [data]);

  const aboutFlats = (id: string) => {
    navigate(`/about-flat/${id}`);
  };

  const handleEditAdmin = (id: string) => {
    navigate(`/edit-selected-user-admin/${id}`);
  };

  return (
    <div className="flex flex-col w-full p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-xl gap-6">
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex justify-between w-full gap-6">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-800">
              Age: {data.birthDate}
            </h1>
            <h1 className="text-xl font-semibold text-gray-900">{`${data.firstName} ${data.lastName}`}</h1>
            <h1 className="text-blue-600">{data.email}</h1>
          </div>
          <div className="flex flex-col text-right">
            <h1 className="text-lg font-semibold text-gray-800">
              Flats Added: {myFlat.length}
            </h1>
            <h1 className="text-lg font-semibold text-gray-800">
              Favorite Flats: {data.faovriteFlatList.length}
            </h1>
            {myFlat?.map((flat) =>
              flat.messages?.length > 0 ? (
                <h1
                  key={flat._id}
                  className="text-lg font-semibold text-gray-800"
                >
                  Messages: {flat.messages.length}
                </h1>
              ) : null
            )}
          </div>
        </div>

        <h1 className="uppercase text-lg font-medium text-gray-600 mt-2">
          Role: {data.isAdmin ? "Admin" : "Regular"}
        </h1>

        <button
          onClick={() => handleEditAdmin(data._id)}
          className="flex justify-center items-center gap-2 text-sm bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-200 mt-4"
        >
          Edit User
        </button>
      </div>

      {showMore ? (
        <div className="flex justify-center items-center w-full mt-6">
          <button
            onClick={() => setShowMore(false)}
            className="flex justify-center items-center gap-2 text-sm bg-black text-white p-2 rounded-md hover:bg-gray-700 transition duration-200 w-[30%]"
          >
            Show Less
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full mt-6">
          <button
            onClick={() => setShowMore(true)}
            className="flex justify-center items-center gap-2 text-sm bg-black text-white p-2 rounded-md hover:bg-gray-700 transition duration-200 w-[30%]"
          >
            Show More
          </button>
        </div>
      )}

      {showMore && (
        <div className="space-y-6">
          {myFlat.map((flat) => (
            <div
              key={flat._id}
              className="flex flex-col bg-white p-5 rounded-lg shadow-lg gap-4"
            >
              <div className="flex justify-center items-center bg-gray-200 p-4 rounded-md text-center">
                <span>No Image Available</span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-lg font-semibold text-blue-500">
                      Added By: {data.firstName}
                    </h1>
                    <h1 className="text-md text-blue-500">
                      Contact: {data.email}
                    </h1>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <p className="text-lg text-blue-500">
                      {flat.rentPrice} EUR
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <h2 className="text-md">City: {flat.city}</h2>
                  <p className="text-md">Street Name: {flat.streetName}</p>
                  <p className="text-md">Street Number: {flat.streetNumber}</p>
                </div>

                <div className="flex gap-6 w-full">
                  <div className="flex gap-6 w-full">
                    <p className="p-2 text-sm bg-gray-200 rounded-md">
                      Year Built: {flat.yearBuilt}
                    </p>
                    <p className="p-2 text-sm bg-gray-200 rounded-md">
                      Available From: {flat.dataAvailable}
                    </p>
                  </div>
                  <div className="flex gap-6 text-sm w-full justify-center items-center">
                    <p className="text-center w-[45%]">
                      Area Size: {flat.areaSize}m<sup>2</sup>
                    </p>
                    <p className="text-center w-[45%]">
                      Has AC? {flat.hasAc ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center p-2 w-full">
                  <button
                    onClick={() => aboutFlats(flat._id)}
                    className="flex justify-center items-center gap-2 text-sm bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 w-full"
                  >
                    Show More About Flat
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
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
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsersCard;
