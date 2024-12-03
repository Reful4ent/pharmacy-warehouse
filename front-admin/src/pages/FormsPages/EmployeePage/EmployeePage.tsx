import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteEmployee, getEmployees} from "../../../shared/api";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./EmployeePage.scss"

export type Employee = {
    id?: number;
    surname: string;
    post_id: number;
}



export const EmployeePage: FC = () => {
    const [dataSource, setDataSource] = useState<Employee[]>([]);
    const navigate = useNavigate();

    const getEmployeesForTable = useCallback(async () => {
        const employees = await getEmployees();
        setDataSource(employees)
    },[])

    const handleDelete = useCallback(async (id: number) => {
        await deleteEmployee(id)
        await getEmployeesForTable();
    },[])

    useEffect(() => {
        getEmployeesForTable()
    }, [dataSource]);

    return (
        <>
            <div className="employee-page">
                <ConfigProvider theme={{
                    components:{
                        Button: {
                            colorPrimary: "#04aa6d",
                            colorPrimaryHover: "#088557",
                            colorPrimaryActive: "#088557",
                        },
                    },
                }}>
                    <Card title="Сотрудники" className="card-container" extra={<Button type="primary" onClick={() => navigate(`create`)} className="table-create-button">Добавить запись</Button>}>
                        <Table dataSource={dataSource} bordered>
                            <Column title="ID" dataIndex="id" key="id"/>
                            <Column title="Фамилия" dataIndex="surname" key='surname'/>
                            <Column title="ID должности" dataIndex="post_id" key="post_id"/>
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