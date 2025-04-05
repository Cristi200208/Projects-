import React, { useState } from "react";
import { IMessages } from "../types/users";

const MessageCard = ({ data }: { data: IMessages }): JSX.Element => {
  const [showHide, setShowHide] = useState(false);

  return (
    <div className="flex flex-col p-5 gap-5 bg-white border-2 border-gray-300 shadow-xl">
      <div>
        <h1>{data.firstName}</h1>
        <h2>{data.dateTime}</h2>
        <p>Message: {data.messages}</p>
      </div>
      {!showHide ? (
        <div className="flex justify-center items-center">
          <button
            onClick={() => setShowHide(true)}
            className="bg-black text-white p-2 rounded-md hover:opacity-80"
          >
            Show Flat
          </button>
        </div>
      ) : (
        <div className="flex md:flex-row xxs:flex-col">
          {!data.flat.imageUrl ? (
            <span>No Image</span>
          ) : (
            <div className="flex justify-center items-center flex-wrap md:w-[20%]">
              <img className="w-[100%]" src={data.flat.imageUrl} />
            </div>
          )}

          <div className="flex flex-col justify-center items-center">
            <div className="grid grid-cols-3  gap-2">
              <div>
                <h1 className="p-1">Added By: {data.firstName}</h1>
                <p className="p-1">Price: {data.flat.rentPrice} EUR</p>
              </div>
              <div>
                <h2 className="p-1">City : {data.flat.city}</h2>
                <p>Street Name: {data.flat.streetName}</p>
                <p>Street Number: {data.flat.streetNumber}</p>
              </div>
              <div>
                <div>
                  <p>Year Built: {data.flat.yearBuilt}</p>
                  <p>Avaialble From: {data.flat.dataAvailable}</p>
                </div>
                <div>
                  <p>
                    Area Size: {data.flat.areaSize}m<sup>2</sup>
                  </p>
                  <p>Has AC ? {data.flat.hasAc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center">
        {!showHide ? null : (
          <button
            onClick={() => setShowHide(false)}
            className="bg-black text-white p-2 rounded-md hover:opacity-80"
          >
            Hide Flat
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageCard;
