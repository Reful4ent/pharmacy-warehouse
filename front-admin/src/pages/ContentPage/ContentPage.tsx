import {FC} from "react";
import {useConfig} from "../../app/context/ConfigProvider/context.ts";
import "./ContentPage.scss"
import {Button, ConfigProvider} from "antd";

export const ContentPage: FC = () => {
    const config = useConfig()
    const permissions = config?.permissions?.filter((permission) => permission.function == '/content') ?? [];
    return (
        <>
            <div className="content-page">
                {permissions[0].read_permission ?
                    <div className="content-page">
                        <div className="menu-tree">
                            <p className="content-head">Иерархия меню:</p>
                            <ul className="ul-tree">
                                <li className="li-element li-text">Сотрудники</li>
                                <li className="li-element li-text">Покупатели</li>
                                <li className="li-element li-text">Поставщики</li>
                                <li className="li-element li-text">Производители</li>
                                <li className="li-element li-text">Лекарства</li>
                                <li className="li-element li-text">
                                    Счета
                                    <ul>
                                        <li className="li-text">Счет фактуры</li>
                                        <li className="li-text">Приходные накладные</li>
                                    </ul>
                                </li>
                                <li className="li-element li-text">
                                    Справочники
                                    <ul>
                                        <li className="li-text">
                                            Медицинские справочники
                                            <ul>
                                                <li className="li-text">Упаковки</li>
                                                <li className="li-text">Категории</li>
                                            </ul>
                                        </li>
                                        <li className="li-text">Cтраны</li>
                                        <li className="li-text">Банки</li>
                                        <li className="li-text">Должности</li>
                                        <li className="li-text">Улицы</li>
                                    </ul>
                                </li>
                                <li className="li-element li-text">Документы - выгрузка данных в  Excel или Word</li>
                                <li className="li-element li-text">
                                    Справка
                                    <ul>
                                        <li className="li-text">Содержание - руководство пользователя</li>
                                        <li className="li-text">О программе - кем и для чего создана программа</li>
                                    </ul>
                                </li>
                                <li className="li-element li-text">
                                    Разное
                                    <ul>
                                        <li className="li-text">Настройка - настройка прав пользователей</li>
                                        <li className="li-text">Сменить пароль - смена своего пароля на новый</li>
                                    </ul>
                                </li>
                                <li className="li-element li-text">Окно запроса - окно собственного запроса для работы с базой данных</li>
                            </ul>
                            <p className="red-p">Если пользователь не имеет доступа к странице, будет выведено соответствующее сообщение</p>
                        </div>
                        <div>
                            <p className="content-head" style={{paddingLeft: "15px"}}>Как работать с данными?</p>
                            <img src="../../../public/img/table.jpg" alt="table"/>
                            <div>
                                <ConfigProvider theme={{
                                    components: {
                                        Button: {
                                            colorPrimary: "#04aa6d",
                                            colorPrimaryHover: "#088557",
                                            colorPrimaryActive: "#088557",
                                        },
                                    },
                                }}>
                                    <ul>
                                        <li className="li-button">
                                            <Button variant="solid" color="default">Подробнее</Button> - перенаправляет
                                            на
                                            страницу где более детализированная информация, для строки из таблицы
                                        </li>
                                        <li className="li-button">
                                            <Button type="primary">Редактировать</Button> - перенаправляет на страницу
                                            редактирования строки из таблицы
                                        </li>
                                        <li className="li-button">
                                            <Button variant="solid" color="danger">Удалить</Button> - удаляет запись из
                                            таблицы
                                        </li>
                                        <li className="li-button">
                                            <Button type="primary" className="table-create-button">Добавить
                                                запись</Button> - перенаправляет на страницу создания строки в таблице
                                        </li>
                                    </ul>
                                </ConfigProvider>
                            </div>
                            <p className="red-p">Некоторые кнопки могут отсутствовать в зависимости от прав пользователя!</p>
                        </div>
                    </div>
                    :
                    <p>У ВАС ОТСУТСТВУЕТ ДОСТУП, ОБРАТИТЕТСЬ К АДМИНИСТРАТОРУ, ДЛЯ ПОЛУЧЕНИЯ ДОСТУПА К ЭТОЙ СТРАНИЦЕ</p>
                }
            </div>
        </>
    )
}