import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { deleteStatement, getStatements} from "../../../shared/api";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./StatementPage.scss"

export type Statement = {

}



export const StatementPage: FC = () => {
    const [dataSource, setDataSource] = useState<Statement[]>([]);
    const navigate = useNavigate();

    const getStatementsForTable = useCallback(async () => {
        const statements = await getStatements();
        setDataSource(statements)
    },[])

    const handleDelete = useCallback(async (id: number) => {
        await deleteStatement(id)
        await getStatementsForTable();
    },[])

    useEffect(() => {
        getStatementsForTable()
    }, [dataSource]);

    return (
        <>
            <div className="statement-page">
                <ConfigProvider theme={{
                    components:{
                        Button: {
                            colorPrimary: "#04aa6d",
                            colorPrimaryHover: "#088557",
                            colorPrimaryActive: "#088557",
                        },
                    },
                }}>
                    <Card title="Приходные накладные" className="card-container" extra={<Button type="primary" onClick={() => navigate(`create`)} className="table-create-button">Добавить запись</Button>}>
                        <Table dataSource={dataSource} bordered>
                            <Column title="ID" dataIndex="id" key="id"/>
                            <Column title="Номер" dataIndex="number" key='number'/>
                            <Column title="Дата поступления" dataIndex="receipt_date" key="receipt_date"/>
                            <Column title="ID поставщика" dataIndex="supplier_id" key="supplier_id"/>
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