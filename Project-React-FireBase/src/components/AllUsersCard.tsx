import React, { useState } from "react";
import { AllUserInterface } from "../types/users";
import { useNavigate } from "react-router";

const AllUsersCard = ({ data }: { data: AllUserInterface }): JSX.Element => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const aboutFlats = (id: string) => {
    navigate(`/about-flat/${id}`);
  };

  const handleEditAdmin = (id: string) => {
    navigate(`/edit-selected-user-admin/${id}`);
  };

  return (
    <div className="flex flex-col w-[100%] p-5 border-gray-300 border-2 gap-3 shadow-lg">
      <div className="flex flex-col gap-3 justify-center items-center">
        <div className="flex  items-center  justify-around w-[100%]">
          <div>
            <h1>Age {data.age}</h1>
            <h1>{`${data.lastName}  ${data.firstName}`}</h1>
            <h1 className="text-blue-500">{data.email}</h1>
          </div>
          <div>
            <h1>Flats Added: {data.flatsAdded.length}</h1>
            <h1>Favorite Flats: {data.favorite.length}</h1>
            {data.messages === undefined ? null : (
              <h1>Messages: {data.messages.length}</h1>
            )}
          </div>
        </div>
        <h1 className="uppercase">Role: {data.role}</h1>
        <button
          onClick={() => handleEditAdmin(data.uid)}
          className="flex justify-center items-center gap-2 text-sm bg-green-600 text-white p-2 rounded-md hover:opacity-80 w-[30%]"
        >
          Edit User
        </button>
      </div>
      {showMore ? (
        <div className="flex justify-center items-center w-[100%]">
          <button
            onClick={() => setShowMore(false)}
            className="flex justify-center items-center gap-2 text-sm bg-black text-white p-2 rounded-md hover:opacity-80 w-[30%]"
          >
            Show Less
          </button>
        </div>
      ) : null}
      {showMore ? (
        <div>
          {data.flatsAdded.map((flat) => (
            <div className="flex gap-5 flex-col bg-white p-3">
              {!flat.imageUrl ? (
                <span className=" flex justify-center items-center bg-gray-300 w-[20%]">
                  No Image
                </span>
              ) : (
                <div className="flex justify-center items-center w-[100%]">
                  <img className="h-[200px]" src={flat.imageUrl} />
                </div>
              )}
              <div className="flex flex-col w-[100%] gap-3">
                <div className="flex justify-between">
                  <div>
                    <h1 className=" text-blue-500">
                      Added By: {data.firstName}
                    </h1>
                    <h1 className=" text-blue-500">Contact: {data.email}</h1>
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <p className=" text-blue-500 text-lg">
                      {flat.rentPrice} EUR
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 ">
                  <h2>City : {flat.city}</h2>
                  <p>Street Name: {flat.streetName}</p>
                  <p>Street Number: {flat.streetNumber}</p>
                </div>
                <div className="flex gap-5 w-[100%] ">
                  <div className="flex gap-5 w-[100%]">
                    <p className=" flex justify-center items-center p-2 text-sm">
                      Year Built {flat.yearBuilt}
                    </p>
                    <p className=" flex justify-center items-center p-2 text-sm">
                      Avaialble From {flat.dataAvailable}
                    </p>
                  </div>
                  <div className="flex gap-5 text-sm w-[100%] justify-center items-center">
                    <p className="text-center w-[60%]">
                      Area Size: {flat.areaSize}m<sup>2</sup>
                    </p>
                    <p className="text-center w-[60%]">Has AC ? {flat.hasAc}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center p-2 w-[100%]">
                  <button
                    onClick={() => aboutFlats(flat.id)}
                    className="flex justify-center items-center gap-2 text-sm bg-black text-white p-2 rounded-md hover:opacity-80 w-[100%]"
                  >
                    Show More About Flat
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
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-[100%]">
          <button
            onClick={() => setShowMore(true)}
            className="flex justify-center items-center gap-2 text-sm bg-black text-white p-2 rounded-md hover:opacity-80 w-[30%]"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllUsersCard;
