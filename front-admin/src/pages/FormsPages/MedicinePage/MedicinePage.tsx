import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { deleteMedicine, getMedicines} from "../../../shared/api";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./MedicinePage.scss"

export type Medicine = {

}



export const MedicinePage: FC = () => {
    const [dataSource, setDataSource] = useState<Medicine[]>([]);
    const navigate = useNavigate();

    const getMedicinesForTable = useCallback(async () => {
        const medicines = await getMedicines();
        setDataSource(medicines)
    },[])

    const handleDelete = useCallback(async (id: number) => {
        await deleteMedicine(id)
        await getMedicinesForTable();
    },[])

    useEffect(() => {
        getMedicinesForTable()
    }, [dataSource]);

    return (
        <>
            <div className="medicine-page">
                <ConfigProvider theme={{
                    components:{
                        Button: {
                            colorPrimary: "#04aa6d",
                            colorPrimaryHover: "#088557",
                            colorPrimaryActive: "#088557",
                        },
                    },
                }}>
                    <Card title="Лекарства" className="card-container" extra={<Button type="primary" onClick={() => navigate(`create`)} className="table-create-button">Добавить запись</Button>}>
                        <Table dataSource={dataSource} bordered>
                            <Column title="ID" dataIndex="id" key="id"/>
                            <Column title="Название" dataIndex="name" key='name'/>
                            <Column title="Дата производства" dataIndex="production_date" key="production_date"/>
                            <Column title="Срок годности" dataIndex="expiration_date" key="expiration_date"/>
                            <Column title="Регистрационный номер" dataIndex="registration_num" key="registration_num"/>
                            <Column title="Цена" dataIndex="price" key="price"/>
                            <Column
                                title="Действия"
                                key="action"
                                render={(_: any, record) => (
                                    <Space size={"middle"}>
                                        <Button variant="solid" color="default" onClick={() => navigate(`view/${record.id}`)}>Подробнее</Button>
                                        <Button type="primary"
                                                onClick={() => navigate(`edit/${record.id}`)}>Редактировать</Button>
                                        <Button variant="solid" color="danger" onClick={() => handleDelete(record.id)}>Удалить</Button>
                                    </Space>
                                )}
                            />
                        </Table>
                    </Card>
                </ConfigProvider>
            </div>
        </>
    )
}