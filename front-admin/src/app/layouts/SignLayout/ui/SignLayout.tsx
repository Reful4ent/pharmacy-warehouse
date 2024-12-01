import {Suspense} from "react";
import {Outlet} from "react-router-dom";
import {Loader} from "../../../../shared/components/Loader/Loader.tsx";


export const SignLayout = () => {

    return (
        <>
            <Suspense fallback={<Loader/>}>
                <Outlet></Outlet>
            </Suspense>
        </>
    )
}