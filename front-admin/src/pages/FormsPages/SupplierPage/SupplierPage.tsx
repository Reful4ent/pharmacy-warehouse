import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteSupplier, /*getSuppliers,*/ sendCustomRequest} from "../../../shared/api";
import {Button, Card, ConfigProvider, Modal, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./SupplierPage.scss"
import {useConfig} from "../../../app/context/ConfigProvider/context.ts";

export type Supplier = {
    id?: number;
    name: string;
    bank_id: number;
    street_id: number;
    phone_number: string;
    tin: string;
    current_account: string;
}



export const SupplierPage: FC = () => {
    const config = useConfig()
    const [dataSource, setDataSource] = useState<Supplier[]>([]);
    const navigate = useNavigate();
    const permissions = config?.permissions?.filter((permission) => permission.function == '/suppliers') ?? [];
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<number>(0)

    const getSuppliersForTable = useCallback(async () => {
        //const suppliers = await getSuppliers();
        //setDataSource(suppliers)
        const result = await sendCustomRequest(`
                    SELECT 
                        supplier.id,
                        supplier.name,
                        supplier.phone_number,
                        supplier.current_account,
                        supplier.tin,
                        bank.name AS bank_name,
                        street.name AS street_name
                    FROM 
                        supplier
                    JOIN 
                        bank ON supplier.bank_id = bank.id
                    JOIN
                        street ON supplier.street_id = street.id`)
        setDataSource(result?.dataSource)
    },[])

    const handleDelete = useCallback( (id: number) => {
        setSelectedId(id);
        setIsOpen(true)
    },[])

    useEffect(() => {
        getSuppliersForTable()
    }, [dataSource]);

    return (
        <>
            <div className="supplier-page">
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
                        <Card title="Поставщики" className="card-container"
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
                                <Column title="Банк" dataIndex="bank_name" key="bank_name"/>
                                <Column title="Улицы" dataIndex="street_name" key="street_name"/>
                                <Column title="Номер телефона" dataIndex="phone_number" key="phone_number"/>
                                <Column title="Расчетный счет" dataIndex="current_account" key="current_account"/>
                                <Column title="ИНН" dataIndex="tin" key="tin"/>
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
                                    />}
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
                                   await deleteSupplier(selectedId)
                                   await getSuppliersForTable();
                               }}
                        >
                            <p>Вы не сможете вернуть удаленные данные!</p>
                        </Modal>
                    </ConfigProvider>
                    :
                    <p>У ВАС ОТСУТСТВУЕТ ДОСТУП, ОБРАТИТЕТСЬ К АДМИНИСТРАТОРУ, ДЛЯ ПОЛУЧЕНИЯ ДОСТУПА К ЭТОЙ СТРАНИЦЕ</p>
                }
            </div>
        </>
    )
}