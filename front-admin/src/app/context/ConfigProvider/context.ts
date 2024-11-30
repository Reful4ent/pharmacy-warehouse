import { createContext, useContext} from "react";
import { IConfigContextValue } from "./types.ts";


export const ConfigContext = createContext<IConfigContextValue | null>(null);


export function useConfig() {
    return useContext(ConfigContext);
}