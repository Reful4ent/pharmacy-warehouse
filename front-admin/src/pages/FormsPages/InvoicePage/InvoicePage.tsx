import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteInvoice, getInvoices} from "../../../shared/api";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./InvoicePage.scss"

export type Invoice = {

}



export const InvoicePage: FC = () => {
    const [dataSource, setDataSource] = useState<Invoice[]>([]);
    const navigate = useNavigate();

    const getInvoicesForTable = useCallback(async () => {
        const invoices = await getInvoices();
        setDataSource(invoices)
    },[])

    const handleDelete = useCallback(async (id: number) => {
        await deleteInvoice(id)
        await getInvoicesForTable();
    },[])

    useEffect(() => {
        getInvoicesForTable()
    }, [dataSource]);

    return (
        <>
            <div className="invoice-page">
                <ConfigProvider theme={{
                    components:{
                        Button: {
                            colorPrimary: "#04aa6d",
                            colorPrimaryHover: "#088557",
                            colorPrimaryActive: "#088557",
                        },
                    },
                }}>
                    <Card title="Счет-фактуры" className="card-container" extra={<Button type="primary" onClick={() => navigate(`create`)} className="table-create-button">Добавить запись</Button>}>
                        <Table dataSource={dataSource} bordered>
                            <Column title="ID" dataIndex="id" key="id"/>
                            <Column title="Номер" dataIndex="number" key='number'/>
                            <Column title="Дата выписки" dataIndex="discharge_date" key="discharge_date"/>
                            <Column title="ID сотрудника" dataIndex="employee_id" key="employee_id"/>
                            <Column title="ID покупателя" dataIndex="buyer_id" key="buyer_id"/>
                            <Column title="Сумма" dataIndex="total_sum" key="total_sum"/>
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