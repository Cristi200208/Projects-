import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthContext";
import { AuthContextProps } from "../types/users";
import { getAllFlats } from "../api/methods/flats";
import { IFlats } from "../types/flats";
import FlatsCards from "../components/AllFlatsCards";

const Home: React.FC = (): JSX.Element => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [flats, setFlats] = useState<IFlats[]>();
  const [filteredFlats, setFilteredFlats] = useState<IFlats[]>();
  const [searchWorld, setSearchWord] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [sortOrderArea, setSortOrderArea] = useState<string>("");
  const [openClose, setOpenClose] = useState(false);
  const [minRentPrice, setMinRentPrice] = useState("");
  const [maxRentPrice, setMaxRentPrice] = useState("");
  const [minAreaSize, setMinAreaSize] = useState("");
  const [maxAreaSize, setMaxAreaSize] = useState("");

  const navigate = useNavigate();
  const fetchDataFlats = async () => {
    const fetchFlats: IFlats[] = await getAllFlats();
    setFlats(fetchFlats);
    setFilteredFlats(fetchFlats);
  };

  const handleSearch = (
    searchWord: string,
    sortOrder: string,
    sortOrderArea: string
  ) => {
    const filtered: IFlats[] | undefined = flats?.filter((flat) => {
      const mathescCity =
        !searchWord ||
        flat.city.toLowerCase().includes(searchWord.toLowerCase());

      return mathescCity;
    });

    if (sortOrder || sortOrderArea) {
      filtered?.sort((a, b) => {
        const rentPriceComparation =
          sortOrder === "asc"
            ? a.rentPrice - b.rentPrice
            : b.rentPrice - a.rentPrice;
        const areaSizeComparation =
          sortOrderArea === "asc"
            ? a.rentPrice - b.rentPrice
            : b.rentPrice - a.rentPrice;

        if (sortOrder) {
          return rentPriceComparation;
        }

        if (sortOrderArea) {
          return areaSizeComparation;
        }
        return 0;
      });
    }

    setFilteredFlats(filtered);
  };

  const filterFLats = () => {
    const filteredFlats = flats?.filter((flat) => {
      const matchesRentPrice =
        (!minRentPrice || flat.rentPrice >= Number(minRentPrice)) &&
        (!maxRentPrice || flat.rentPrice <= Number(maxRentPrice));

      const matchesAreaSize =
        (!minAreaSize || flat.rentPrice >= Number(minAreaSize)) &&
        (!maxAreaSize || flat.rentPrice <= Number(maxAreaSize));

      return matchesRentPrice && matchesAreaSize;
    });

    setFilteredFlats(filteredFlats);
  };

  const ressetFilre = () => {
    setFilteredFlats(flats);
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
    fetchDataFlats();
  }, [user, navigate]);

  useEffect(() => {
    handleSearch(searchWorld, sortOrder, sortOrderArea);
  }, [searchWorld, sortOrder, sortOrderArea, flats]);

  if (flats?.length === 0) {
    return (
      <span className="flex justify-center items-center text-3xl font-semibold text-gray-700 w-full h-auto mt-4 border-b-4 border-blue-400 p-4 bg-gray-50 shadow-md rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out">
        No flats Added
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-7 py-10 2xl:px-[25%] xl:px-80 lg:px-40 md:px-20 sm:px-10 xxs:px-4">
      <h1 className="flex justify-center items-center text-4xl font-bold text-gray-800 border-b-4 border-blue-500 p-5 shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out">
        All Flats
      </h1>

      <div className="flex justify-start items-center gap-4 md:p-0 md:flex-row xxs:flex-col xxs:px-8">
        <input
          className="border-2 border-gray-300 rounded-md w-[30%] h-[35px] shadow-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search FLAT"
          type="text"
          onChange={(e) => setSearchWord(e.target.value)}
        />

        <select
          onChange={(event) => setSortOrder(event.target.value)}
          className="bg-gray-200 text-black p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Ascending</option>
          <option value="dsc">Price: Descending</option>
        </select>

        <select
          onChange={(event) => setSortOrderArea(event.target.value)}
          className="bg-gray-200 text-black p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort by Area</option>
          <option value="asc">Area: Ascending</option>
          <option value="dsc">Area: Descending</option>
        </select>
        <div>
          {openClose ? (
            <div className="absolute mt-14 2xl:left-[81%] 2xl:top-[12%] xl:left-[81%] md:left-[60%] md:top-[23%] sm:left-[48%] sm:top-[23%] xxs:left-[35%] xxs:top-[25%] gap-3 p-4 rounded-lg border-2 border-gray-500 bg-white text-black shadow-xl flex flex-col justify-center items-center transition-all ease-out duration-500 2xl:w-[18%] xl:w-[18%] md:w-[30%] md:h-[350px] xxs:w-[50%] w-[35%] text-xl">
              <div className="flex flex-col justify-center items-center gap-3 w-full">
                <label className="text-lg font-semibold">By Price</label>
                <div className="flex gap-6 justify-center items-center w-full">
                  <input
                    onChange={(e) => setMinRentPrice(e.target.value)}
                    type="number"
                    className="text-center border-2 border-black rounded-md w-[40%] p-2"
                    placeholder="Min"
                  />
                  <input
                    onChange={(e) => setMaxRentPrice(e.target.value)}
                    type="number"
                    className="text-center border-2 border-black rounded-md w-[40%] p-2"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center gap-3 w-full">
                <label className="text-lg font-semibold">By Area</label>
                <div className="flex gap-6 justify-center items-center w-full">
                  <input
                    onChange={(e) => setMinAreaSize(e.target.value)}
                    type="number"
                    className="text-center border-2 border-black rounded-md w-[40%] p-2"
                    placeholder="Min"
                  />
                  <input
                    onChange={(e) => setMaxAreaSize(e.target.value)}
                    type="number"
                    className="text-center border-2 border-black rounded-md w-[40%] p-2"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <button
                  className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  onClick={filterFLats}
                >
                  Apply Filter
                </button>
                <button
                  className="py-2 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
                  onClick={ressetFilre}
                >
                  Reset Filter
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setOpenClose(true)}
              type="button"
              className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              Filter
            </button>
          )}

          {openClose && (
            <button
              onClick={() => setOpenClose(false)}
              type="button"
              className="py-2 px-6 mt-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
            >
              Close Filter
            </button>
          )}
        </div>
      </div>

      {filteredFlats?.map((flat, index) => (
        <FlatsCards key={index} data={flat} />
      ))}
    </div>
  );
};

export default Home;
