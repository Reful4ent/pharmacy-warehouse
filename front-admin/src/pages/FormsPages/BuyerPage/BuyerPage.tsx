import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteBuyer, /*getBuyers,*/ sendCustomRequest} from "../../../shared/api";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./BuyerPage.scss"

export type Buyer = {
    id?: number;
    name: string;
    bank_id: number;
    street_id: number;
    phone_number: string;
    tin: string;
}



export const BuyerPage: FC = () => {
    const [dataSource, setDataSource] = useState<Buyer[]>([]);
    const navigate = useNavigate();

    const getBuyersForTable = useCallback(async () => {
        //const medicines = await getBuyers();
        //setDataSource(medicines)
        const result = await sendCustomRequest(`
                    SELECT 
                        buyer.id,
                        buyer.name,
                        buyer.phone_number,
                        buyer.tin,
                        bank.name AS bank_name,
                        street.name AS street_name
                    FROM 
                        buyer
                    JOIN 
                        bank ON buyer.bank_id = bank.id
                    JOIN
                        street ON buyer.street_id = street.id`
        )
        setDataSource(result?.dataSource)
    },[])

    const handleDelete = useCallback(async (id: number) => {
        await deleteBuyer(id)
        await getBuyersForTable();
    },[])

    useEffect(() => {
        getBuyersForTable()
    }, [dataSource]);

    return (
        <>
            <div className="buyer-page">
                <ConfigProvider theme={{
                    components:{
                        Button: {
                            colorPrimary: "#04aa6d",
                            colorPrimaryHover: "#088557",
                            colorPrimaryActive: "#088557",
                        },
                    },
                }}>
                    <Card title="Покупатели" className="card-container" extra={<Button type="primary" onClick={() => navigate(`create`)} className="table-create-button">Добавить запись</Button>}>
                        <Table dataSource={dataSource} bordered>
                            <Column title="ID" dataIndex="id" key="id"/>
                            <Column title="Название" dataIndex="name" key='name'/>
                            <Column title="Банк" dataIndex="bank_name" key="bank_name"/>
                            <Column title="Улицы" dataIndex="street_name" key="street_name"/>
                            <Column title="Номер телефона" dataIndex="phone_number" key="phone_number"/>
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