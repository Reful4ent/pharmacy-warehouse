import {Navigate, RouteObject} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout/ui/MainLayout.tsx";
import {
    AboutPage,
    BankPage, BuyerPage, CategoryPage,
    ChangePasswordPage, ContentPage,
    CountryPage,
    CreateBankPage, CreateBuyerPage, CreateCategoryPage,
    CreateCountryPage, CreateEmployeePage, CreateInvoicePage, CreateMedicinePage,
    CreatePackagePage,
    CreatePostPage, CreateProducerPage, CreateSettingsUserPage, CreateStatementPage,
    CreateStreetPage, CreateSupplierPage,
    CustomRequestPage, DocsPage,
    EditBankPage, EditBuyerPage, EditCategoryPage,
    EditCountryPage, EditEmployeePage, EditInvoicePage, EditMedicinePage, EditPackagePage,
    EditPostPage, EditProducerPage, EditSettingsUserPage, EditStatementPage,
    EditStreetPage, EditSupplierPage, EmployeePage,
    ErrorPage,
    HomePage, InvoicePage, MedicinePage,
    PackagePage,
    PostPage, ProducerPage, SettingsUserPage,
    SignInPage, StatementPage,
    StreetPage, SupplierPage, ViewInvoicePage, ViewSettingsUserPage, ViewStatementPage,
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
                path: 'packages/',
                element: <PrivateRoute><PackagePage/></PrivateRoute>
            },
            {
                path: 'packages/create',
                element: <PrivateRoute><CreatePackagePage/></PrivateRoute>
            },
            {
                path: 'packages/edit/:id',
                element: <PrivateRoute><EditPackagePage/></PrivateRoute>
            },
            {
                path: 'categories/',
                element: <PrivateRoute><CategoryPage/></PrivateRoute>
            },
            {
                path: 'categories/create',
                element: <PrivateRoute><CreateCategoryPage/></PrivateRoute>
            },
            {
                path: 'categories/edit/:id',
                element: <PrivateRoute><EditCategoryPage/></PrivateRoute>
            },
            {
                path: 'medicines/',
                element: <PrivateRoute><MedicinePage/></PrivateRoute>
            },
            {
                path: 'medicines/create',
                element: <PrivateRoute><CreateMedicinePage/></PrivateRoute>
            },
            {
                path: 'medicines/edit/:id',
                element: <PrivateRoute><EditMedicinePage/></PrivateRoute>
            },
            {
                path: 'employees/',
                element: <PrivateRoute><EmployeePage/></PrivateRoute>
            },
            {
                path: 'employees/create',
                element: <PrivateRoute><CreateEmployeePage/></PrivateRoute>
            },
            {
                path: 'employees/edit/:id',
                element: <PrivateRoute><EditEmployeePage/></PrivateRoute>
            },
            {
                path: 'buyers/',
                element: <PrivateRoute><BuyerPage/></PrivateRoute>
            },
            {
                path: 'buyers/create',
                element: <PrivateRoute><CreateBuyerPage/></PrivateRoute>
            },
            {
                path: 'buyers/edit/:id',
                element: <PrivateRoute><EditBuyerPage/></PrivateRoute>
            },
            {
                path: 'producers/',
                element: <PrivateRoute><ProducerPage/></PrivateRoute>
            },
            {
                path: 'producers/create',
                element: <PrivateRoute><CreateProducerPage/></PrivateRoute>
            },
            {
                path: 'producers/edit/:id',
                element: <PrivateRoute><EditProducerPage/></PrivateRoute>
            },
            {
                path: 'suppliers/',
                element: <PrivateRoute><SupplierPage/></PrivateRoute>
            },
            {
                path: 'suppliers/create',
                element: <PrivateRoute><CreateSupplierPage/></PrivateRoute>
            },
            {
                path: 'suppliers/edit/:id',
                element: <PrivateRoute><EditSupplierPage/></PrivateRoute>
            },
            {
                path: 'invoices/',
                element: <PrivateRoute><InvoicePage/></PrivateRoute>
            },
            {
                path: 'invoices/create',
                element: <PrivateRoute><CreateInvoicePage/></PrivateRoute>
            },
            {
                path: 'invoices/edit/:id',
                element: <PrivateRoute><EditInvoicePage/></PrivateRoute>
            },
            {
                path: 'invoices/view/:id',
                element: <PrivateRoute><ViewInvoicePage/></PrivateRoute>
            },
            {
                path: 'statements/',
                element: <PrivateRoute><StatementPage/></PrivateRoute>
            },
            {
                path: 'statements/create',
                element: <PrivateRoute><CreateStatementPage/></PrivateRoute>
            },
            {
                path: 'statements/edit/:id',
                element: <PrivateRoute><EditStatementPage/></PrivateRoute>
            },
            {
                path: 'statements/view/:id',
                element: <PrivateRoute><ViewStatementPage/></PrivateRoute>
            },
            {
                path: 'about/',
                element: <PrivateRoute><AboutPage/></PrivateRoute>
            },
            {
                path: 'settings/',
                element: <PrivateRoute><SettingsUserPage/></PrivateRoute>
            },
            {
                path: 'settings/create',
                element: <PrivateRoute><CreateSettingsUserPage/></PrivateRoute>
            },
            {
                path: 'settings/edit/:id',
                element: <PrivateRoute><EditSettingsUserPage/></PrivateRoute>
            },
            {
                path: 'settings/view/:id',
                element: <PrivateRoute><ViewSettingsUserPage/></PrivateRoute>
            },
            {
                path: 'content/',
                element: <PrivateRoute><ContentPage/></PrivateRoute>
            },
            {
                path: 'docs/',
                element: <PrivateRoute><DocsPage /></PrivateRoute>
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