import {Navigate, RouteObject} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout/ui/MainLayout.tsx";
import {ErrorPage, HomePage} from "./lazyPages.tsx";


export const router : RouteObject[] =[
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: 'home',
                element: <HomePage/>
            },
            {
                path: "*",
                element: <Navigate to="home"/>
            },
            {
                path: "",
                element: <Navigate to="home"/>
            }
        ]
    }
]