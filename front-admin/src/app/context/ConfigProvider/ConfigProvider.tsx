import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {HeaderMenuItem, IConfigContextValue, IContext} from "./types.ts";
import {getConfig, getUserPermissions} from "../../../shared/api";
import {ConfigContext} from "./context.ts";
import {useAuth} from "../AuthProvider/context.ts";


export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
    const auth = useAuth()
    const [config, setConfig] = useState<IContext | null>(null)

    const getConfigFrom = useCallback(async () => {
        const config_request = await getConfig();
        if(auth?.user) {
            const permissions = await getUserPermissions(auth.user.id)
            let finallyConfig:HeaderMenuItem[] =[];
            if(config_request?.header && permissions) {
                for (let i = 0; i < config_request?.header.length; i++) {
                    if(permissions[i].read_permission) {
                        finallyConfig.push(config_request?.header [i])
                    }
                }
                setConfig({
                    headerContext: finallyConfig
                })
            }
        }
    },[])


    useEffect(() => {
        getConfigFrom()
    }, [getConfigFrom, auth?.isAuthenticated]);


    const value: IConfigContextValue = {
        config,
    }

    return (
        <>
            <ConfigContext.Provider value={value}>
                {children}
            </ConfigContext.Provider>
        </>
    )
}