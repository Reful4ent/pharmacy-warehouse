import {FC} from "react";
import "./AboutPage.scss"

export const AboutPage:FC = () => {
    return (
        <>
            <div className="about-page">
                <div className="about-container">
                    <h1 className="about-main-text">О программе:</h1>
                    <p className="p-text">Курсовая работа по дисциплине "Базы данных"</p>
                    <p className="p-text">Данная программа предназначена для работы с базой данных аптечного склада</p>
                    <p className="p-text-head">Тема:</p>
                    <p className="p-text">Аптечный склад</p>
                    <p className="p-text-head">Выполнил:</p>
                    <p className="p-text">Студент: Гордиенко Дмитрий Андреевич</p>
                    <p className="p-text-head">Группа:</p>
                    <p className="p-text">АВТ-213</p>
                    <p className="p-text-head">Лицензия:</p>
                    <p className="p-text">Бесплатная программа для <span
                        className="red-span">некоммерческого</span> использования.</p>
                </div>
            </div>
        </>
    )
}