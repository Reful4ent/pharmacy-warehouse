import {createContext, useContext} from "react";
import {IAuthProvider} from "./types.ts";

export const AuthContext = createContext<IAuthProvider | null>(null);

export const useAuth = () => useContext(AuthContext);