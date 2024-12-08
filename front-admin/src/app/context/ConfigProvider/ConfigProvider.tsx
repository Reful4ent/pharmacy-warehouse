import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {HeaderMenuItem, IConfigContextValue, IContext} from "./types.ts";
import {getConfig, getUserPermissions} from "../../../shared/api";
import {ConfigContext} from "./context.ts";
import {useAuth} from "../AuthProvider/context.ts";
import {Permission} from "../../../shared/api/types.ts";


export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
    const auth = useAuth()
    const [config, setConfig] = useState<IContext | null>(null)
    const [permissions, setPermissions] = useState<Permission[] | null>(null)

    const getConfigFrom = useCallback(async (id: any) => {
        const config_request = await getConfig();
        if(auth?.user) {
            const permissions = await getUserPermissions(id)
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
                setPermissions(permissions)
            }
        }
    },[])


    useEffect(() => {
        getConfigFrom(auth?.user?.id)
    }, [auth?.isAuthenticated, auth?.user?.id]);


    const value: IConfigContextValue = {
        config,
        permissions,
    }

    return (
        <>
            <ConfigContext.Provider value={value}>
                {children}
            </ConfigContext.Provider>
        </>
    )
}