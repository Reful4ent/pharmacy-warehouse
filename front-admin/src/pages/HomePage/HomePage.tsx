import {FC} from "react";

export const HomePage: FC = () => {

    return(
        <>
            <div className="error-page">
                <h1 className="error-text-head">Oops!</h1>
                <p className="error-text-main">Sorry, an unexpected error has occurred.</p>
                <p className="error-text-error">
                </p>
            </div>
        </>
    )
}