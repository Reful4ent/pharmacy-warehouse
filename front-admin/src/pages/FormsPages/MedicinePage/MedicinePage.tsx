import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteMedicine, /*getMedicines, */sendCustomRequest} from "../../../shared/api";
import {Button, Card, ConfigProvider, Modal, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./MedicinePage.scss"
import {useConfig} from "../../../app/context/ConfigProvider/context.ts";

export type Medicine = {
    id: number,
    name: string,
    production_date: string,
    expiration_date: string,
    registration_num: string,
    price: number;
    category_names: number[];
    package_name: number[];
    producer_name: number[];
}



export const MedicinePage: FC = () => {
    const [dataSource, setDataSource] = useState<Medicine[]>([]);
    const navigate = useNavigate();
    const config = useConfig()
    const permissions = config?.permissions?.filter((permission) => permission.function == '/medicines') ?? [];
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedMedicineId, setSelectedMedicineId] = useState<number>(0)

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
                    LEFT JOIN 
                        medicine_producer ON medicine.id = medicine_producer.medicine_id
                    LEFT JOIN 
                        producer ON medicine_producer.producer_id = producer.id
                    LEFT JOIN 
                        medicine_category ON medicine.id = medicine_category.medicine_id
                    LEFT JOIN 
                        category ON medicine_category.category_id = category.id
                    LEFT JOIN 
                        medicine_package ON medicine.id = medicine_package.medicine_id
                    LEFT JOIN 
                        package ON medicine_package.package_id = package.id
                    LEFT JOIN 
                        country ON producer.country_id = country.id
                    GROUP BY 
                        medicine.id, medicine.name, medicine.production_date, medicine.expiration_date, 
                        medicine.registration_num, medicine.price, producer.name, package.name, country.name;
        `)
        setDataSource(result?.dataSource)
    },[])

    const handleDelete = useCallback( (id: number) => {
        setIsOpen(true)
        setSelectedMedicineId(id)
    },[])

    useEffect(() => {
        getMedicinesForTable()
    }, [dataSource]);

    return (
        <>
            <div className="medicine-page">
                {permissions[0].read_permission ?
                    <ConfigProvider theme={{
                        components: {
                            Button: {
                                colorPrimary: "#04aa6d",
                                colorPrimaryHover: "#088557",
                                colorPrimaryActive: "#088557",
                            },
                        },
                    }}>
                        <Card title="Лекарства" className="card-container"
                              extra={
                                  <>
                                      {permissions[0].write_permission &&
                                          <Button type="primary" onClick={() => navigate(`create`)}
                                                  className="table-create-button">Добавить запись</Button>
                                      }
                                  </>
                              }
                        >
                            <Table dataSource={dataSource} bordered>
                                <Column title="ID" dataIndex="id" key="id"/>
                                <Column title="Название" dataIndex="name" key='name'/>
                                <Column title="Дата производства" dataIndex="production_date" key="production_date" render={date => date.split('T')[0]}/>
                                <Column title="Срок годности" dataIndex="expiration_date" key="expiration_date" render={date => date.split('T')[0]}/>
                                <Column title="Регистрационный номер" dataIndex="registration_num"
                                        key="registration_num"/>
                                <Column title="Производитель" dataIndex="producer_name" key="producer_name"/>
                                <Column title="Упаковка" dataIndex="package_name" key="package_name"/>
                                <Column title="Категории" dataIndex="category_names" key="category_names"/>
                                <Column title="Страна производитель" dataIndex="country_name" key="country_name"/>
                                <Column title="Цена" dataIndex="price" key="price"/>
                                {(permissions[0].delete_permission || permissions[0].edit_permission) &&
                                    <Column
                                        title="Действия"
                                        key="action"
                                        render={(_: any, record) => (
                                            <Space size={"middle"}>
                                                {permissions[0].edit_permission &&
                                                    <Button type="primary"
                                                            onClick={() => navigate(`edit/${record.id}`)}>Редактировать</Button>
                                                }
                                                {permissions[0].delete_permission &&
                                                    <Button variant="solid" color="danger"
                                                            onClick={() => handleDelete(record.id)}>Удалить</Button>
                                                }
                                            </Space>
                                        )}
                                    />
                                }
                            </Table>
                        </Card>
                        <Modal open={isOpen}
                               onCancel={() => setIsOpen(false)}
                               title="Вы точно хотите удалить?"
                               cancelText="Нет"
                               okText="Удалить"
                               okType="danger"
                               onOk={async () => {
                                   setIsOpen(false);
                                   await deleteMedicine(selectedMedicineId);
                                   await getMedicinesForTable();
                               }}
                        >
                            <p>При нажатии на кнопку "удалить", удаляться все записи по данному лекарству из таблицы!</p>
                            <p>Если вы хотите удалить одну из записей связанную с этим лекарством воспользуйтесь кнопкой "редактировать"</p>
                        </Modal>
                    </ConfigProvider>
                    :
                    <p>У ВАС ОТСУТСТВУЕТ ДОСТУП, ОБРАТИТЕТСЬ К АДМИНИСТРАТОРУ, ДЛЯ ПОЛУЧЕНИЯ ДОСТУПА К ЭТОЙ СТРАНИЦЕ</p>
                }
            </div>
        </>
    )
}