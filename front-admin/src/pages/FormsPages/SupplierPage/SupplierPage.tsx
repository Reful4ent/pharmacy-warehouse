import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteSupplier, getSuppliers} from "../../../shared/api";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./SupplierPage.scss"

export type Supplier = {

}



export const SupplierPage: FC = () => {
    const [dataSource, setDataSource] = useState<Supplier[]>([]);
    const navigate = useNavigate();

    const getSuppliersForTable = useCallback(async () => {
        const suppliers = await getSuppliers();
        setDataSource(suppliers)
    },[])

    const handleDelete = useCallback(async (id: number) => {
        await deleteSupplier(id)
        await getSuppliersForTable();
    },[])

    useEffect(() => {
        getSuppliersForTable()
    }, [dataSource]);

    return (
        <>
            <div className="supplier-page">
                <ConfigProvider theme={{
                    components:{
                        Button: {
                            colorPrimary: "#04aa6d",
                            colorPrimaryHover: "#088557",
                            colorPrimaryActive: "#088557",
                        },
                    },
                }}>
                    <Card title="Поставщики" className="card-container" extra={<Button type="primary" onClick={() => navigate(`create`)} className="table-create-button">Добавить запись</Button>}>
                        <Table dataSource={dataSource} bordered>
                            <Column title="ID" dataIndex="id" key="id"/>
                            <Column title="Название" dataIndex="name" key='name'/>
                            <Column title="ID банка" dataIndex="bank_id" key="bank_id"/>
                            <Column title="ID улицы" dataIndex="street_id" key="street_id"/>
                            <Column title="Номер телефона" dataIndex="phone_number" key="phone_number"/>
                            <Column title="Расчетный счет" dataIndex="current_account" key="current_account"/>
                            <Column title="ИНН" dataIndex="tin" key="tin"/>
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