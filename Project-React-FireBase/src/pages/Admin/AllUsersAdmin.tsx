import React, { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../../api/methods/user";
import {
  AllUserInterface,
  AllUsers,
  AuthContextProps,
  Users,
} from "../../types/users";
import AllUsersCard from "../../components/AllUsersCard";
import { AuthContext } from "../../providers/AuthContext";
import { useNavigate } from "react-router";

const AllUsersAdmin: React.FC = (): JSX.Element => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  const [users, setUsers] = useState<AllUsers[] | null>([]);
  const [filteredUser, setFilteredUser] = useState<AllUsers[] | null>();
  const [filteredFirstName, setFilteredFirstName] = useState<string>("");
  const [filteredLastName, setFilteredLastName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [ageRange, setAgeRange] = useState<string>("");

  const [openClose, setOpenClose] = useState(false);
  const navigate = useNavigate();

  console.log(users);

  const fetchAllUsers = async () => {
    const users = await getAllUsers();
    setUsers(users);
    users?.map((user) => user.data);
    setUsers(users);
    setFilteredUser(users);
  };

  const handleSearch = (
    filteredFirstName: string,
    filteredLastName: string,
    userRole: string,
    ageRange: string
  ) => {
    const filtered = users?.filter((userData) => {
      const userDataFiltered = userData.data as Users;

      const matchFirstName =
        !filteredFirstName ||
        userDataFiltered.firstName
          .toLowerCase()
          .includes(filteredFirstName.toLowerCase());

      const matchRole =
        !userRole ||
        userDataFiltered.role.toLowerCase().includes(userRole.toLowerCase());
      console.log(userRole);

      const matchLastName =
        !filteredLastName ||
        userDataFiltered.lastName
          .toLowerCase()
          .includes(filteredLastName.toLowerCase());
      console.log(filteredLastName);

      const matchAge =
        !ageRange ||
        userDataFiltered.age.toString().includes(ageRange.toLowerCase());

      return matchFirstName && matchLastName && matchRole && matchAge;
    });

    setFilteredUser(filtered);
  };

  useEffect(() => {
    fetchAllUsers();
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    handleSearch(filteredFirstName, filteredLastName, userRole, ageRange);
  }, [filteredFirstName, filteredLastName, ageRange, userRole]);

  return (
    <div className="flex flex-col justify-center items-center xl:py-10 xl:px-80 sm:gap-10 py-10 px-52 lg:px-80 xxs:px-5 gap-5">
      <h1 className=" flex justify-center items-center text-3xl border-b-2 border-gray-400 p-2 w-[100%] mt-10">
        All User List
      </h1>
      <div className="flex justify-start items-center w-[100%]">
        {openClose ? (
          <div className="flex gap-4 justify-center items-center w-[70%] md:flex-row xxs:flex-col">
            <input
              className=" border-2  border-gray-300 rounded-md w-[30%] h-[35px] shadow-lg text-center "
              placeholder="Type"
              type="text"
              onChange={(e) => setUserRole(e.target.value)}
            />
            <input
              className=" border-2  border-gray-300 rounded-md w-[30%] h-[35px] shadow-lg text-center "
              placeholder="First Name"
              type="text"
              onChange={(e) => setFilteredFirstName(e.target.value)}
            />
            <input
              className=" border-2  border-gray-300 rounded-md w-[30%] h-[35px] shadow-lg text-center "
              placeholder="Last Name"
              type="text"
              onChange={(e) => setFilteredLastName(e.target.value)}
            />
            <input
              onChange={(event) => setAgeRange(event.target.value)}
              placeholder="age"
              type="number"
              className=" border-2  border-gray-300 rounded-md w-[30%] h-[35px] shadow-lg text-center "
            />
          </div>
        ) : (
          <div className="flex justify-center items-center w-[100%]">
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
          <div className="ml-3">
            <button
              onClick={() => setOpenClose(false)}
              type="button"
              className="py-2 w-[100%] px-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Close Filtre
            </button>
          </div>
        ) : null}
      </div>
      <div className=" flex flex-col gap-10 justify-center items-center xl:w-[50%]  sm:w-[90%]">
        {filteredUser?.map((user) => (
          <AllUsersCard key={user.id} data={user.data as AllUserInterface} />
        ))}
      </div>
    </div>
  );
};

export default AllUsersAdmin;
