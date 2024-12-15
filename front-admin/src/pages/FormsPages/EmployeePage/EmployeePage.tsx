import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteEmployee, getEmployees} from "../../../shared/api";
import {Button, Card, ConfigProvider, Input, Modal, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./EmployeePage.scss"
import {useConfig} from "../../../app/context/ConfigProvider/context.ts";
import {SearchOutlined} from "@ant-design/icons";

export type Employee = {
    id?: number;
    surname?: string;
    post_id?: number;
    post_name?: string;
}

export const EmployeePage: FC = () => {
    const config = useConfig()
    const [dataSource, setDataSource] = useState<Employee[]>([]);
    const navigate = useNavigate();
    const permissions = config?.permissions?.filter((permission) => permission.function == '/employees') ?? [];
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const [surnameFilter, setSurnameFilter] = useState<string>('')
    const [postFilter, setPostFilter] = useState<string>('')


    const getEmployeesForTable = useCallback(async () => {
        const result = await getEmployees();
        setDataSource(result)
    },[])

    const handleSearch = useCallback(async (surname: string, post: string) => {
        const employee: Employee = {surname: surname, post_name: post}
        const result = await getEmployees(employee);
        setDataSource(result)
    },[])

    const handleDelete = useCallback( (id: number) => {
        setSelectedId(id);
        setIsOpen(true)
    },[])

    useEffect(() => {
        handleSearch(surnameFilter,postFilter)
    }, [handleSearch, surnameFilter, postFilter]);

    useEffect(() => {
        getEmployeesForTable()
    }, [getEmployeesForTable]);

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
                                <Column title="ID" dataIndex="id" key="id" width="3%"/>
                                <Column
                                    title="Фамилия"
                                    dataIndex="surname"
                                    key='surname'
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => setSurnameFilter(e.target.value)}/>
                                    )}
                                />
                                <Column
                                    title="Должность"
                                    dataIndex="post_name"
                                    key="post_name"
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => setPostFilter(e.target.value)}/>
                                    )}
                                />
                                {(permissions[0].delete_permission || permissions[0].edit_permission) &&
                                    <Column
                                        title="Действия"
                                        key="action"
                                        width="10%"
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
                        <Modal open={isOpen}
                               onCancel={() => setIsOpen(false)}
                               title="Вы точно хотите удалить?"
                               cancelText="Нет"
                               okText="Удалить"
                               okType="danger"
                               onOk={async () => {
                                   setIsOpen(false);
                                   await deleteEmployee(selectedId)
                                   await getEmployeesForTable();
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