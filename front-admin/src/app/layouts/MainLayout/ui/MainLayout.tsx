import {FC, Suspense} from "react";
import {Outlet} from "react-router-dom";
import {Header} from "../../../../widgets/Header";
import {Loader} from "../../../../shared/components/Loader/Loader.tsx";


export const MainLayout: FC = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<Loader/>}>
                <Outlet></Outlet>
            </Suspense>
        </>
    )
}