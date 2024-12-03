import {Navigate, RouteObject} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout/ui/MainLayout.tsx";
import {
    BankPage,
    ChangePasswordPage, CountryPage, CreateBankPage, CreateCountryPage, CreatePostPage, CreateStreetPage,
    CustomRequestPage, EditBankPage, EditCountryPage, EditPostPage,
    EditStreetPage,
    ErrorPage,
    HomePage, PostPage,
    SignInPage,
    StreetPage
} from "./lazyPages.tsx";
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
                path: 'streets/',
                element: <PrivateRoute><StreetPage/></PrivateRoute>,
            },
            {
                path: 'streets/create',
                element:<PrivateRoute><CreateStreetPage/></PrivateRoute>
            },
            {
                path: 'streets/edit/:id',
                element: <PrivateRoute><EditStreetPage/></PrivateRoute>
            },
            {
                path: 'posts/',
                element: <PrivateRoute><PostPage/></PrivateRoute>
            },
            {
                path: 'posts/create',
                element: <PrivateRoute><CreatePostPage/></PrivateRoute>
            },
            {
                path: 'posts/edit/:id',
                element: <PrivateRoute><EditPostPage/></PrivateRoute>
            },
            {
                path: 'banks/',
                element: <PrivateRoute><BankPage/></PrivateRoute>
            },
            {
                path: 'banks/create',
                element: <PrivateRoute><CreateBankPage/></PrivateRoute>
            },
            {
                path: 'banks/edit/:id',
                element: <PrivateRoute><EditBankPage/></PrivateRoute>
            },
            {
                path: 'countries/',
                element: <PrivateRoute><CountryPage/></PrivateRoute>
            },
            {
                path: 'countries/create',
                element: <PrivateRoute><CreateCountryPage/></PrivateRoute>
            },
            {
                path: 'countries/edit/:id',
                element: <PrivateRoute><EditCountryPage/></PrivateRoute>
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