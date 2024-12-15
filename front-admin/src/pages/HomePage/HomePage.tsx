import {FC} from "react";
import './HomePage.scss'

export const HomePage: FC = () => {
    return(
        <>
            <div className="home-page">
                <h1 className="home-text-head">Домашняя страница!</h1>
                <p className="home-text-main">Аптечный склад №1</p>
            </div>
        </>
    )
}