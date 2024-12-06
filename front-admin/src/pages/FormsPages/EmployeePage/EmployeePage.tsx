import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteEmployee, sendCustomRequest} from "../../../shared/api";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./EmployeePage.scss"
import {useConfig} from "../../../app/context/ConfigProvider/context.ts";

export type Employee = {
    id?: number;
    surname: string;
    post_id: number;
}



export const EmployeePage: FC = () => {
    const config = useConfig()
    const [dataSource, setDataSource] = useState<Employee[]>([]);
    const navigate = useNavigate();
    const permissions = config?.permissions?.filter((permission) => permission.function == '/employees') ?? [];


    const getEmployeesForTable = useCallback(async () => {
        const result = await sendCustomRequest(`
                    SELECT 
                        employee.id,
                        employee.surname,
                        post.name
                    FROM 
                        employee
                    JOIN 
                        post ON employee.post_id = post.id`)
        setDataSource(result?.dataSource)
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
                {permissions[0].read_permission ?
                    <ConfigProvider theme={{
                        components:{
                            Button: {
                                colorPrimary: "#04aa6d",
                                colorPrimaryHover: "#088557",
                                colorPrimaryActive: "#088557",
                            },
                        },
                    }}>
                        <Card title="Сотрудники" className="card-container"
                              extra={
                                  <>
                                      {permissions[0].write_permission &&
                                          <Button type="primary" onClick={() => navigate(`create`)} className="table-create-button">Добавить запись</Button>
                                      }
                                  </>
                              }
                        >
                            <Table dataSource={dataSource} bordered>
                                <Column title="ID" dataIndex="id" key="id"/>
                                <Column title="Фамилия" dataIndex="surname" key='surname'/>
                                <Column title="Должность" dataIndex="name" key="name"/>
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
                                                    <Button variant="solid" color="danger" onClick={() => handleDelete(record.id)}>Удалить</Button>
                                                }
                                            </Space>
                                        )}
                                    />
                                }
                            </Table>
                        </Card>
                    </ConfigProvider>
                    :
                    <p>У ВАС ОТСУТСТВУЕТ ДОСТУП, ОБРАТИТЕТСЬ К АДМИНИСТРАТОРУ, ДЛЯ ПОЛУЧЕНИЯ ДОСТУПА К ЭТОЙ СТРАНИЦЕ</p>
                }
            </div>
        </>
    )
}