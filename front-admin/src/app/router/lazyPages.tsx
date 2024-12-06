import {lazy} from "react";

export const ErrorPage = lazy(() => import('../../pages/ErrorPage/ErrorPage').then(m => ({default: m.ErrorPage})))
export const HomePage = lazy(() => import('../../pages/HomePage/HomePage').then(m => ({default: m.HomePage})))
export const SignInPage = lazy(() => import('../../pages/SignInPage/SignInPage').then(m => ({default: m.SignInPage})))
export const CustomRequestPage = lazy(() => import('../../pages/CustomRequestPage/CustomRequestPage').then(m => ({default: m.CustomRequestPage})))
export const ChangePasswordPage = lazy(() => import('../../pages/ChangePasswordPage/ChangePasswordPage').then(m => ({default: m.ChangePasswordPage})))

export const StreetPage = lazy(() => import('../../pages/FormsPages/StreetPage/StreetPage').then(m => ({default: m.StreetPage})))
export const EditStreetPage = lazy(() => import('../../pages/FormsPages/StreetPage/edit/EditStreetPage').then(m => ({default: m.EditStreetPage})))
export const CreateStreetPage = lazy(() => import('../../pages/FormsPages/StreetPage/create/CreateStreetPage').then(m => ({default: m.CreateStreetPage})))

export const PostPage = lazy(() => import('../../pages/FormsPages/PostPage/PostPage').then(m => ({default: m.PostPage})))
export const CreatePostPage = lazy(() => import('../../pages/FormsPages/PostPage/CreatePostPage/CreatePostPage').then(m => ({default: m.CreatePostPage})))
export const EditPostPage = lazy(() => import('../../pages/FormsPages/PostPage/EditPostPage/EditPostPage').then(m => ({default: m.EditPostPage})))

export const BankPage = lazy(() => import('../../pages/FormsPages/BankPage/BankPage').then(m => ({default: m.BankPage})))
export const CreateBankPage = lazy(() => import('../../pages/FormsPages/BankPage/CreateBankPage/CreateBankPage').then(m => ({default: m.CreateBankPage})))
export const EditBankPage = lazy(() => import('../../pages/FormsPages/BankPage/EditBankPage/EditBankPage').then(m => ({default: m.EditBankPage})))

export const CountryPage = lazy(() => import('../../pages/FormsPages/CountryPage/CountryPage').then(m => ({default: m.CountryPage})))
export const CreateCountryPage = lazy(() => import('../../pages/FormsPages/CountryPage/CreateCountryPage/CreateCountryPage').then(m => ({default: m.CreateCountryPage})))
export const EditCountryPage = lazy(() => import('../../pages/FormsPages/CountryPage/EditCountryPage/EditCountryPage').then(m => ({default: m.EditCountryPage})))

export const PackagePage = lazy(() => import('../../pages/FormsPages/PackagePage/PackagePage').then(m => ({default: m.PackagePage})))
export const EditPackagePage = lazy(() => import('../../pages/FormsPages/PackagePage/EditPackagePage/EditPackagePage').then(m => ({default: m.EditPackagePage})))
export const CreatePackagePage = lazy(() => import('../../pages/FormsPages/PackagePage/CreatePackagePage/CreatePackagePage').then(m => ({default: m.CreatePackagePage})))

export const CategoryPage = lazy(() => import('../../pages/FormsPages/CategoryPage/CategoryPage').then(m => ({default: m.CategoryPage})))
export const EditCategoryPage = lazy(() => import('../../pages/FormsPages/CategoryPage/EditCategoryPage/EditCategoryPage').then(m => ({default: m.EditCategoryPage})))
export const CreateCategoryPage = lazy(() => import('../../pages/FormsPages/CategoryPage/CreateCategoryPage/CreateCategoryPage').then(m => ({default: m.CreateCategoryPage})))

export const MedicinePage = lazy(() => import('../../pages/FormsPages/MedicinePage/MedicinePage').then(m => ({default: m.MedicinePage})))
export const CreateMedicinePage = lazy(() => import('../../pages/FormsPages/MedicinePage/CreateMedicinePage/CreateMedicinePage').then(m => ({default: m.CreateMedicinePage})))
export const EditMedicinePage = lazy(() => import('../../pages/FormsPages/MedicinePage/EditMedicinePage/EditMedicinePage').then(m => ({default: m.EditMedicinePage})))

export const EmployeePage = lazy(() => import('../../pages/FormsPages/EmployeePage/EmployeePage').then(m => ({default: m.EmployeePage})))
export const CreateEmployeePage = lazy(() => import('../../pages/FormsPages/EmployeePage/CreateEmployeePage/CreateEmployeePage').then(m => ({default: m.CreateEmployeePage})))
export const EditEmployeePage = lazy(() => import('../../pages/FormsPages/EmployeePage/EditEmployeePage/EditEmployeePage').then(m => ({default: m.EditEmployeePage})))

export const BuyerPage = lazy(() => import('../../pages/FormsPages/BuyerPage/BuyerPage.tsx').then(m => ({default: m.BuyerPage})))
export const CreateBuyerPage = lazy(() => import('../../pages/FormsPages/BuyerPage/CreateBuyerPage/CreateBuyerPage').then(m => ({default: m.CreateBuyerPage})))
export const EditBuyerPage = lazy(() => import('../../pages/FormsPages/BuyerPage/EditBuyerPage/EditBuyerPage').then(m => ({default: m.EditBuyerPage})))

export const ProducerPage = lazy(() => import('../../pages/FormsPages/ProducerPage/ProducerPage').then(m => ({default: m.ProducerPage})))
export const EditProducerPage = lazy(() => import('../../pages/FormsPages/ProducerPage/EditProducerPage/EditProducerPage').then(m => ({default: m.EditProducerPage})))
export const CreateProducerPage = lazy(() => import('../../pages/FormsPages/ProducerPage/CreateProducerPage/CreateProducerPage').then(m => ({default: m.CreateProducerPage})))

export const SupplierPage = lazy(() => import('../../pages/FormsPages/SupplierPage/SupplierPage').then(m => ({default: m.SupplierPage})))
export const CreateSupplierPage = lazy(() => import('../../pages/FormsPages/SupplierPage/CreateSupplierPage/CreateSupplierPage.tsx').then(m => ({default: m.CreateSupplierPage})))
export const EditSupplierPage = lazy(() => import('../../pages/FormsPages/SupplierPage/EditSupplierPage/EditSupplierPage').then(m => ({default: m.EditSupplierPage})))

export const InvoicePage = lazy(() => import('../../pages/FormsPages/InvoicePage/InvoicePage').then(m => ({default: m.InvoicePage})))
export const CreateInvoicePage = lazy(() => import('../../pages/FormsPages/InvoicePage/CreateInvoicePage/CreateInvoicePage').then(m => ({default: m.CreateInvoicePage})))
export const EditInvoicePage = lazy(() => import('../../pages/FormsPages/InvoicePage/EditInvoicePage/EditInvoicePage').then(m => ({default: m.EditInvoicePage})))
export const ViewInvoicePage = lazy(() => import('../../pages/FormsPages/InvoicePage/ViewInvoicePage/ViewInvoicePage').then(m => ({default: m.ViewInvoicePage})))

export const StatementPage = lazy(() => import('../../pages/FormsPages/StatementPage/StatementPage').then(m => ({default: m.StatementPage})))
export const CreateStatementPage = lazy(() => import('../../pages/FormsPages/StatementPage/CreateStatementPage/CreateStatementPage').then(m => ({default: m.CreateStatementPage})))
export const EditStatementPage = lazy(() => import('../../pages/FormsPages/StatementPage/EditStatementPage/EditStatementPage').then(m => ({default: m.EditStatementPage})))
export const ViewStatementPage = lazy(() => import('../../pages/FormsPages/StatementPage/ViewStatementPage/ViewStatementPage').then(m => ({default: m.ViewStatementPage})))

export const AboutPage = lazy(() => import('../../pages/AboutPage/AboutPage').then(m => ({default: m.AboutPage})))

export const SettingsUserPage = lazy(() => import('../../pages/SettingsUserPage/SettingsUserPage').then(m => ({default: m.SettingsUserPage})))

export const ContentPage = lazy(() => import('../../pages/ContentPage/ContentPage').then(m => ({default: m.ContentPage})))

export const DocsPage = lazy(() => import('../../pages/DocsPage/DocsPage').then(m => ({default: m.DocsPage})))