import { createContext } from "react";
import { AuthContextProps } from "../types/users";

export const AuthContext = createContext<AuthContextProps | null>(null);
