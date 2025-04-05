import React, { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../../api/methods/user";
import { AuthContextProps, Users } from "../../types/users";
import AllUsersCard from "../../components/AllUsersCard";
import { AuthContext } from "../../providers/AuthContext";
import { useNavigate } from "react-router";

const AllUsersAdmin: React.FC = (): JSX.Element => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [users, setUsers] = useState<Users[] | null>([]);
  const [filteredUser, setFilteredUser] = useState<Users[] | null>();
  const [filteredFirstName, setFilteredFirstName] = useState<string>("");
  const [filteredLastName, setFilteredLastName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [ageRange, setAgeRange] = useState<string>("");

  const [openClose, setOpenClose] = useState(false);
  const navigate = useNavigate();

  console.log(users);

  const fetchAllUsers = async () => {
    try {
      const userData = await getAllUsers();
      if (userData) {
        setUsers(userData);
        setFilteredUser(userData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Please try again.");
    }
  };

  const handleSearch = (
    filteredFirstName: string,
    filteredLastName: string,
    userRole: string,
    ageRange: string
  ) => {
    const filtered = users?.filter((userData) => {
      const userDataFiltered = userData as Users;

      const matchFirstName =
        !filteredFirstName ||
        userDataFiltered.firstName
          .toLowerCase()
          .includes(filteredFirstName.toLowerCase());

      const matchRole = !userRole || userDataFiltered.isAdmin;
      console.log(userRole);

      const matchLastName =
        !filteredLastName ||
        userDataFiltered.lastName
          .toLowerCase()
          .includes(filteredLastName.toLowerCase());
      console.log(filteredLastName);

      const matchAge =
        !ageRange ||
        userDataFiltered.birthDate.toString().includes(ageRange.toLowerCase());

      return matchFirstName && matchLastName && matchRole && matchAge;
    });

    setFilteredUser(filtered);
  };

  useEffect(() => {
    fetchAllUsers();
    if (user?.isAdmin === false) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    handleSearch(filteredFirstName, filteredLastName, userRole, ageRange);
  }, [filteredFirstName, filteredLastName, ageRange, userRole]);

  return (
    <div className="flex flex-col justify-center items-center xl:py-14 xl:px-28 sm:gap-10 py-12 px-8 lg:px-20 xxs:px-5 gap-6 bg-gray-50">
      <h1 className="flex justify-center items-center text-4xl font-semibold text-gray-800 border-b-4 border-gray-400 p-4 w-full mt-8">
        All User List
      </h1>

      <div className="flex justify-between items-center w-full mt-6">
        {openClose ? (
          <div className="flex gap-6 justify-center items-center w-[80%] md:flex-row xxs:flex-col">
            <input
              className="border-2 border-gray-300 rounded-md w-[30%] h-12 shadow-md px-4 text-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type"
              type="text"
              onChange={(e) => setUserRole(e.target.value)}
            />
            <input
              className="border-2 border-gray-300 rounded-md w-[30%] h-12 shadow-md px-4 text-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="First Name"
              type="text"
              onChange={(e) => setFilteredFirstName(e.target.value)}
            />
            <input
              className="border-2 border-gray-300 rounded-md w-[30%] h-12 shadow-md px-4 text-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Last Name"
              type="text"
              onChange={(e) => setFilteredLastName(e.target.value)}
            />
            <input
              className="border-2 border-gray-300 rounded-md w-[30%] h-12 shadow-md px-4 text-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Age"
              type="number"
              onChange={(event) => setAgeRange(event.target.value)}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center w-full">
            <button
              onClick={() => setOpenClose(true)}
              type="button"
              className="py-2 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
            >
              Filter
            </button>
          </div>
        )}

        {openClose && (
          <div className="ml-3">
            <button
              onClick={() => setOpenClose(false)}
              type="button"
              className="py-2 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 transition duration-200"
            >
              Close Filter
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-8 justify-center items-center xl:w-[60%] sm:w-[90%]">
        {filteredUser?.map((user) => (
          <AllUsersCard key={user._id} data={user as Users} />
        ))}
      </div>
    </div>
  );
};

export default AllUsersAdmin;
