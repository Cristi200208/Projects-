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
    if (!JSON.parse(localStorage.getItem("loggedUser") as string)) {
      navigate("/login");
    }
    fetchDataFlats();
  }, [user, navigate]);

  useEffect(() => {
    handleSearch(searchWorld, sortOrder, sortOrderArea);
  }, [searchWorld, sortOrder, sortOrderArea, flats]);

  if (flats?.length === 0) {
    return (
      <span className="flex justify-center items-center text-3xl w-[100%] h-[90%] mt-2 border-b-2 border-gray-400 p-2">
        No flats Added
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-7 py-10 2xl:px-[25%] xl:px-80 lg:px-40 md:px-20 sm:px-10 xxs:px-4">
      <h1 className=" flex justify-center items-center text-3xl border-b-2 border-gray-400 p-2">
        All Flats
      </h1>
      <div className="flex justify-start items-center gap-2 md:p-0 md:flex-row xxs:flex-col xxs:px-10">
        <input
          className=" border-2  border-gray-300 rounded-md w-[30%] h-[35px] shadow-lg text-center "
          placeholder="Search FLAT"
          type="text"
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <select
          onChange={(event) => setSortOrder(event.target.value)}
          className="bg-gray-300 p-1"
        >
          <option value="">Sort by Price</option>
          <option value="asc"> Price: Ascendent</option>
          <option value="dsc"> Price: Descendent</option>
        </select>
        <select
          onChange={(event) => setSortOrderArea(event.target.value)}
          className="bg-gray-300 p-1"
        >
          <option value="">Sort by Area</option>
          <option value="asc"> Area: Ascendent</option>
          <option value="dsc"> Area: Descendent</option>
        </select>
        {openClose ? (
          <div className=" absolute mt-14 2xl:left-[81%] 2xl:top-[12%] xl:left-[81%] md:left-[60%]  md:top-[23%] sm:left-[48%]  sm:top-[23%] xxs:left-[35%] xxs:top-[25%] gap-3 p-2 rounded-b-md border-2 border-gray-500 bg-white text-black shadow-2xl flex flex-col justify-center items-center  transition-all ease-out duration-500 2xl:w-[18%] xl:w-[18%] md:w-[30%] md:h-[350px] xxs:w-[50%] w-[35%] text-xl ">
            <div className="flex flex-col justify-center items-center gap-2 ">
              <label>By Price</label>
              <div className="flex gap-4 justify-center items-center px-2">
                <input
                  onChange={(e) => setMinRentPrice(e.target.value)}
                  type="number"
                  className="text-center border-2 border-black rounded-md w-[50%]"
                  placeholder="Min"
                />
                <input
                  onChange={(e) => setMaxRentPrice(e.target.value)}
                  type="number"
                  className=" text-center border-2 border-black rounded-md w-[50%]"
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <label>By Area</label>
              <div className="flex gap-4 justify-center items-center px-2">
                <input
                  onChange={(e) => setMinAreaSize(e.target.value)}
                  type="text"
                  className=" text-center border-2 border-black rounded-md w-[50%]"
                  placeholder="Min"
                />
                <input
                  onChange={(e) => setMaxAreaSize(e.target.value)}
                  type="text"
                  className=" text-center border-2 border-black rounded-md w-[50%]"
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-[50%]">
              <button
                className=" justify-center  py-1.5  px-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={filterFLats}
              >
                Apply Filtre
              </button>
              <button
                className="justify-center  py-1.5 px-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={ressetFilre}
              >
                Reset Filtre
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setOpenClose(true)}
              type="button"
              className="py-1.5 px-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Filtre
            </button>
          </div>
        )}
        {openClose ? (
          <div>
            <button
              onClick={() => setOpenClose(false)}
              type="button"
              className="py-1.5 px-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Close Filtre
            </button>
          </div>
        ) : null}
      </div>
      {filteredFlats?.map((flat, index) => (
        <FlatsCards key={index} data={flat} />
      ))}
    </div>
  );
};

export default Home;
