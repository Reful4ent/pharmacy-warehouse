import {useAuth} from "../../app/context/AuthProvider/context";
import "./SignOutButton.scss"

export const SignOutButton = () => {
    const auth = useAuth();

    return (
        <>
            {
                auth &&
                <button className="sign-out-button" onClick={auth.signOut}>Выйти</button>
            }
        </>
    )
}