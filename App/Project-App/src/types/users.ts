import { IFavoriteFlat, IFlats } from "./flats";

export interface Users {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: number;
  faovriteFlatList: IFavoriteFlat[];
  isAdmin: boolean;
}

export interface AllUserInterface {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  favorite: [IFlats];
  flatsAdded: [IFlats];
  messages?: [object];
  id: string;
  role: "regular" | "admin";
}

export interface IMessages {
  flat: IFlats;
  firstName: string;
  dateTime: string;
  messages: string;
}

export interface AllUsers {
  id: string;
  data: object;
}

export interface AuthContextProps {
  user: Users | null;
  setUser: React.Dispatch<React.SetStateAction<Users | null>>;
}
