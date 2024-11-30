import {useRoutes} from "react-router-dom";
import {router} from './router/router'
import {ConfigProvider} from "./context/ConfigProvider/ConfigProvider.tsx";
import {FC} from "react";
import "./index.css"

export const App : FC = () => {

    return (
        <>
            <ConfigProvider>
                { useRoutes(router) }
            </ConfigProvider>
        </>
    )
}

