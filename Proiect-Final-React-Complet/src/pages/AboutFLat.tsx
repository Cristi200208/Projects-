import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getFlatsById, sendMessageToFlat } from "../api/methods/flats";
import { IFlats } from "../types/flats";
import { AuthContextProps } from "../types/users";
import { AuthContext } from "../providers/AuthContext";
import { useForm } from "react-hook-form";

const AboutFLat: React.FC = (): JSX.Element => {
  const [flat, setFlat] = useState<IFlats>();
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [flatSame, setFlatSame] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFlats>();
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  console.log(flat?._id);

  const formatDate = (isoDate: string): string => {
    if (!isoDate) return "N/A";
    return isoDate.split("T")[0];
  };

  const idComparer = () => {
    if (flat && user) {
      if (flat.userId === user._id) {
        setFlatSame(false);
      } else {
        setFlatSame(true);
      }
    }
  };

  const handleMessage = async (data: IFlats) => {
    if (!flat?._id) {
      alert("Flat data is missing.");
      return;
    }

    try {
      await sendMessageToFlat(flat._id, data.messages as unknown as string);
      alert("Message sent successfully!");
    } catch (error) {
      alert("Failed to send the message.");
    }
  };

  const fetchFlat = async (id: string) => {
    const result = await getFlatsById(id);
    console.log(result);
    setFlat(result as IFlats);
    setLoading(false);
  };

  useEffect(() => {
    fetchFlat(id as string);
  }, [id, loading]);

  useEffect(() => {
    if (!loading) {
      idComparer();
    }
  }, [flat]);

  return (
    <div className="flex justify-center items-center gap-8 p-6 bg-gray-100">
      {/* Property Details Section */}
      <div className="flex flex-col justify-center items-center gap-5 bg-white shadow-lg p-6 w-[70%] border-gray-300 border-2 rounded-lg">
        <div className="flex justify-between w-full mb-4">
          <div>
            <h1 className="text-blue-500 text-xl font-semibold">
              <span className="text-black">Added By: </span>
              {flat?.firstName}
            </h1>
          </div>
          <p className="text-red-500 text-2xl font-semibold">
            {flat?.rentPrice} EUR
          </p>
        </div>

        {/* Image Placeholder */}
        <span className="flex justify-center items-center bg-gray-300 w-full h-[400px] mb-4 rounded-lg">
          No Image
        </span>

        <div className="flex flex-col w-full gap-4">
          {/* Property Details */}
          <div className="flex justify-between p-3 bg-blue-100 rounded-lg shadow-sm">
            <h2 className="font-medium">City</h2>
            <h2>{flat?.city}</h2>
          </div>

          <div className="flex justify-between p-3 bg-blue-100 rounded-lg shadow-sm">
            <h2 className="font-medium">Street Name</h2>
            <h2>{flat?.streetName}</h2>
          </div>

          <div className="flex justify-between p-3 bg-blue-100 rounded-lg shadow-sm">
            <h2 className="font-medium">Street Number</h2>
            <h2>{flat?.streetNumber}</h2>
          </div>

          <div className="flex justify-between p-3 bg-blue-100 rounded-lg shadow-sm">
            <h2 className="font-medium">Year Built</h2>
            <h2>{flat?.yearBuilt}</h2>
          </div>

          <div className="flex justify-between p-3 bg-blue-100 rounded-lg shadow-sm">
            <h2 className="font-medium">Available From</h2>
            <h2>{formatDate(flat?.dataAvailable as string)}</h2>
          </div>

          <div className="flex justify-between p-3 bg-blue-100 rounded-lg shadow-sm">
            <h2 className="font-medium">Area Size</h2>
            <h2>{flat?.areaSize} m²</h2>
          </div>

          <div className="flex justify-between p-3 bg-blue-100 rounded-lg shadow-sm">
            <h2 className="font-medium">Has AC?</h2>
            <h2>{flat?.hasAc ? "Yes" : "No"}</h2>
          </div>

          {/* Description Section */}
          <div className="w-full mt-6">
            <h1 className="flex justify-center items-center bg-blue-100 py-2 text-lg font-semibold rounded-md">
              Description
            </h1>
            {flat?.description.length === 0 ? (
              <span className="text-center text-gray-500">No Description</span>
            ) : (
              <p className="border-2 border-blue-100 p-4 mt-2 rounded-lg">
                {flat?.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Message Section */}
      {flatSame && (
        <div className="flex flex-col p-6 shadow-xl w-[35%] border-gray-300 border-2 rounded-lg h-auto">
          <div className="w-full flex justify-end">
            <button
              onClick={() => navigate("/")}
              className="bg-gray-400 text-white p-3 rounded-md hover:opacity-80 w-[40%]"
              type="button"
            >
              Back To Home
            </button>
          </div>

          <form
            className="flex flex-col gap-5 justify-center items-center w-full mt-6"
            onSubmit={handleSubmit(handleMessage)}
          >
            <h1 className="text-xl font-semibold mb-4">Send a Message</h1>
            <textarea
              {...register("messages", { required: "Message Required" })}
              className="border-2 overflow-auto border-gray-500 rounded-md w-[85%] h-[200px] p-4 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.messages && (
              <span className="text-red-500 mt-2">
                {errors.messages.message}
              </span>
            )}
            <button className="bg-black text-white p-3 rounded-md hover:bg-gray-700 w-[40%] h-[45px] mt-6">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AboutFLat;
