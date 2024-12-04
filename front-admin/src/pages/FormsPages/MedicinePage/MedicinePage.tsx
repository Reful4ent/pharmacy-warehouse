import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteMedicine, getMedicines, sendCustomRequest} from "../../../shared/api";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./MedicinePage.scss"

export type Medicine = {

}



export const MedicinePage: FC = () => {
    const [dataSource, setDataSource] = useState<Medicine[]>([]);
    const navigate = useNavigate();

    const getMedicinesForTable = useCallback(async () => {
        //const medicines = await getMedicines();
        //setDataSource(medicines)
        const result = await sendCustomRequest(`
                    SELECT 
                        medicine.id,
                        medicine.name,
                        medicine.production_date,
                        medicine.expiration_date,
                        medicine.registration_num,
                        medicine.price,
                        producer.name AS producer_name,
                        STRING_AGG(DISTINCT category.name, ', ') AS category_names,
                        package.name AS package_name,
                        country.name AS country_name
                    FROM 
                        medicine
                    JOIN 
                        medicine_producer ON medicine.id = medicine_producer.medicine_id
                    JOIN 
                        producer ON medicine_producer.producer_id = producer.id
                    JOIN 
                        medicine_category ON medicine.id = medicine_category.medicine_id
                    JOIN 
                        category ON medicine_category.category_id = category.id
                    JOIN 
                        medicine_package ON medicine.id = medicine_package.medicine_id
                    JOIN 
                        package ON medicine_package.package_id = package.id
                    JOIN 
                        country ON producer.country_id = country.id
                    GROUP BY 
                        medicine.id, medicine.name, medicine.production_date, medicine.expiration_date, 
                        medicine.registration_num, medicine.price, producer.name, package.name, country.name;
        `)
        setDataSource(result?.dataSource)
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
                            <Column title="Производитель" dataIndex="producer_name" key="producer_name"/>
                            <Column title="Упаковка" dataIndex="package_name" key="package_name"/>
                            <Column title="Категория" dataIndex="category_names" key="category_names"/>
                            <Column title="Страна производитель" dataIndex="country_name" key="country_name"/>
                            <Column title="Цена" dataIndex="price" key="price"/>
                            <Column
                                title="Действия"
                                key="action"
                                render={(_: any, record) => (
                                    <Space size={"middle"}>
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