
import {useAuth} from "../../app/context/AuthProvider/context.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import "./SignInPage.scss"
import {Logo} from "../../shared/components/SVG/Logo/Logo.tsx";

export const SignInPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const form = e.target;
        const user = {
            login: form.login.value,
            password: form.password.value,
        }

        if(auth) {
            await auth.signIn(user).then((response) => {
                if (response === true) {
                    navigate("/home");
                    setShowError(false);
                } else {
                    setShowError(true);
                }
            });
        }
    }
    return(
        <>
            <div className="sign-in-main">
                <div className="sign-in-content">
                    <div className="header__logo">
                        <Logo fill={"black"}/>
                        <p className="logo__text">Аптечный склад</p>
                    </div>
                    <form className="sign-in-form" onSubmit={async (event) => await handleSubmit(event)}>
                        <p className="sign-in__text">Логин</p>
                        <input className="sign-in__input" type="text" name="login" placeholder="Логин"
                               required/>
                        <p className="sign-in__text">Пароль</p>
                        <input className="sign-in__input" type="password" name="password" placeholder="Пароль"
                               required/>
                        {showError && (<p className="sign-in__error">Неверный логин или пароль</p>)}
                        <button className="sign-in__btn" type="submit">Войти</button>
                    </form>
                </div>
            </div>
        </>
    )
}