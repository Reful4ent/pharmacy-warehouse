import {useRoutes} from "react-router-dom";
import {router} from './router/router'
import {ConfigProvider} from "./context/ConfigProvider/ConfigProvider.tsx";
import {FC} from "react";
import "./index.css"
import {AuthProvider} from "./context/AuthProvider/AuthProvider.tsx";

export const App : FC = () => {

    return (
        <>
            <AuthProvider>
                <ConfigProvider>
                    { useRoutes(router) }
                </ConfigProvider>
            </AuthProvider>
        </>
    )
}
