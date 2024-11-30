import {lazy} from "react";

export const ErrorPage = lazy(() => import('../../pages/ErrorPage/ErrorPage').then(m => ({default: m.ErrorPage})))
export const HomePage = lazy(() => import('../../pages/HomePage/HomePage').then(m => ({default: m.HomePage})))