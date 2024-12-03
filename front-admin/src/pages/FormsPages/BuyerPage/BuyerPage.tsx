import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteBuyer, getBuyers} from "../../../shared/api";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./BuyerPage.scss"

export type BuyerPage = {

}



export const BuyerPage: FC = () => {
    const [dataSource, setDataSource] = useState<BuyerPage[]>([]);
    const navigate = useNavigate();

    const getBuyersForTable = useCallback(async () => {
        const medicines = await getBuyers();
        setDataSource(medicines)
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
                            <Column title="ID банка" dataIndex="bank_id" key="bank_id"/>
                            <Column title="ID улицы" dataIndex="street_id" key="street_id"/>
                            <Column title="Номер телефона" dataIndex="phone_number" key="phone_number"/>
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