import {FC, Suspense} from "react";
import {Outlet} from "react-router-dom";
import {Header} from "../../../../widgets/Header";


export const MainLayout: FC = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<p>Oppss...</p>}>
                <Outlet></Outlet>
            </Suspense>
        </>
    )
}