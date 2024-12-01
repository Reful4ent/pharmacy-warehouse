import {Navigate} from "react-router-dom";
import {useAuth} from "../../app/context/AuthProvider/context"
import {FC, PropsWithChildren} from "react";


export const PrivateRoute:FC<PropsWithChildren> = ({children}) => {
    const auth = useAuth();

    if(auth === null || auth.user === null)
        return <Navigate to="/auth/login" replace/>;
    return children;
}