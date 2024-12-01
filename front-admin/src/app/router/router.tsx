import {Navigate, RouteObject} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout/ui/MainLayout.tsx";
import {ChangePasswordPage, CustomRequestPage, ErrorPage, HomePage, SignInPage} from "./lazyPages.tsx";
import {PrivateRoute} from "../../features/PrivateRoute/PrivateRoute.tsx";
import {SignLayout} from "../layouts/SignLayout/ui/SignLayout.tsx";


export const router : RouteObject[] =[
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: 'home',
                element: <PrivateRoute><HomePage/></PrivateRoute>
            },
            {
                path: 'customRequest',
                element: <PrivateRoute><CustomRequestPage /></PrivateRoute>
            },
            {
                path: 'users/change-password',
                element: <PrivateRoute><ChangePasswordPage/></PrivateRoute>
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
    },
    {
        path: 'auth/',
        element: <SignLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "login",
                element: <SignInPage/>,
            },
            {
                path: "*",
                element: <Navigate to="login"/>
            },
            {
                path: "",
                element: <Navigate to="login"/>
            }
        ]
    },
]