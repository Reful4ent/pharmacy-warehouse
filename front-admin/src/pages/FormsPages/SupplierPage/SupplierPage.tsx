import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteSupplier, /*getSuppliers,*/ sendCustomRequest} from "../../../shared/api";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./SupplierPage.scss"

export type Supplier = {

}



export const SupplierPage: FC = () => {
    const [dataSource, setDataSource] = useState<Supplier[]>([]);
    const navigate = useNavigate();

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
                            <Column title="Банк" dataIndex="bank_name" key="bank_name"/>
                            <Column title="Улицы" dataIndex="street_name" key="street_name"/>
                            <Column title="Номер телефона" dataIndex="phone_number" key="phone_number"/>
                            <Column title="Расчетный счет" dataIndex="current_account" key="current_account"/>
                            <Column title="ИНН" dataIndex="tin" key="tin"/>
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