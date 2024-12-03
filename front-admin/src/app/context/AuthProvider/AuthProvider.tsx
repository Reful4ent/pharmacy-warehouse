import {FC, PropsWithChildren, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IAuthProvider, User} from "./types.ts";
import {AuthContext} from "./context.ts";
import axios from "axios";
import {urlRoute} from "../../../shared/api/route.ts";




export const AuthProvider:FC<PropsWithChildren> = ({children}) => {
    const navigate = useNavigate();
    const [isAuthenticated,setIsAuthenticated] = useState<boolean>(false)
    // @ts-ignore
    const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem("user")) || null);


    const signIn = async (data: any) => {
        try {
            const response = await axios.post(
                urlRoute +
                `/users/login`,
                {
                    data: {
                        login: data.login,
                        password: data.password
                    }
                }
            );

            if(response.data.canSignIn.password_match) {
                const tempUser = {
                    id: response.data.user.id,
                    login: data.login,
                    password: data.password,
                }
                setUser(tempUser);
                setIsAuthenticated(true)
                localStorage.setItem("user", JSON.stringify({id: tempUser.id, login: data.login, password: data.password}));
                return true
            }
            localStorage.removeItem("user");
            return false;
        } catch (error) {
            console.error(error);
            return null;
        }
    }



    const signOut =  () => {
        setIsAuthenticated(false)
        setUser(null);
        localStorage.removeItem("user");
        navigate('/auth/login');
        return true;
    }

    //TODO: сделать запрос на обновление данных пользователя
    const updateUser = async (data: any) => {
        try {
            const response = await axios.put(
                urlRoute + `/users/change-password`,
                {
                    data: {
                        id: data.id,
                        login: data.login,
                        password: data.password
                    }
                }
            );
            if(response.data) {
                const tempUser = {
                    id: data.id,
                    login: data.login,
                    password: data.password,
                }
                setUser(tempUser);
                localStorage.setItem("user", JSON.stringify({id: tempUser.id, login: data.login, password: data.password}));
                return true
            }
            return false;
        }  catch (error) {
            console.error(error);
            return null;
        }
    }

    const value: IAuthProvider = {
        user,
        isAuthenticated,
        signIn,
        signOut,
        updateUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}