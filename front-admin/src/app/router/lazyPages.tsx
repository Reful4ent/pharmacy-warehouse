import {lazy} from "react";

export const ErrorPage = lazy(() => import('../../pages/ErrorPage/ErrorPage').then(m => ({default: m.ErrorPage})))
export const HomePage = lazy(() => import('../../pages/HomePage/HomePage').then(m => ({default: m.HomePage})))
export const SignInPage = lazy(() => import('../../pages/SignInPage/SignInPage').then(m => ({default: m.SignInPage})))
export const CustomRequestPage = lazy(() => import('../../pages/CustomRequestPage/CustomRequestPage').then(m => ({default: m.CustomRequestPage})))
export const ChangePasswordPage = lazy(() => import('../../pages/ChangePasswordPage/ChangePasswordPage').then(m => ({default: m.ChangePasswordPage})))
export const StreetPage = lazy(() => import('../../pages/StreetPage/StreetPage').then(m => ({default: m.StreetPage})))
export const EditStreetPage = lazy(() => import('../../pages/StreetPage/edit/EditStreetPage').then(m => ({default: m.EditStreetPage})))
export const CreateStreetPage = lazy(() => import('../../pages/StreetPage/create/CreateStreetPage').then(m => ({default: m.CreateStreetPage})))