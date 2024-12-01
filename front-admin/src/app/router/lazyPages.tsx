import {lazy} from "react";

export const ErrorPage = lazy(() => import('../../pages/ErrorPage/ErrorPage').then(m => ({default: m.ErrorPage})))
export const HomePage = lazy(() => import('../../pages/HomePage/HomePage').then(m => ({default: m.HomePage})))
export const SignInPage = lazy(() => import('../../pages/SignInPage/SignInPage').then(m => ({default: m.SignInPage})))
export const CustomRequestPage = lazy(() => import('../../pages/CustomRequestPage/CustomRequestPage').then(m => ({default: m.CustomRequestPage})))
export const ChangePasswordPage = lazy(() => import('../../pages/ChangePasswordPage/ChangePasswordPage').then(m => ({default: m.ChangePasswordPage})))