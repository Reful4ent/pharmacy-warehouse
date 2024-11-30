import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {IContext} from "./types.ts";
import {getConfig} from "../../../shared/api";
import {ConfigContext} from "./context.ts";


export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {

    const [config, setConfig] = useState<IContext | null>(null)

    const getConfigFrom = useCallback(async () => {
        const result = getConfig().then((response) => {
            setConfig({
                headerContext: response?.header,
            })
        });
        result.finally()
    },[])

    useEffect(() => {
        getConfigFrom()
    }, [getConfigFrom]);


    return (
        <>
            <ConfigContext.Provider value={{context: config}}>
                {children}
            </ConfigContext.Provider>
        </>
    )
}