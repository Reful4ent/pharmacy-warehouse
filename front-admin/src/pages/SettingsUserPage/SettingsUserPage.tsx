import {FC, useCallback, useEffect, useState} from "react";
import "./SettingsUserPage.scss"
import {useNavigate} from "react-router-dom";
import {useConfig} from "../../app/context/ConfigProvider/context.ts";
import {deleteUsers, getUsers} from "../../shared/api";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import {User} from "../../app/context/AuthProvider/types.ts";
import {useAuth} from "../../app/context/AuthProvider/context.ts";


export const SettingsUserPage: FC = () => {
    const [dataSource, setDataSource] = useState<User[]>([]);
    const navigate = useNavigate();
    const config = useConfig()
    const auth = useAuth()
    const permissions = config?.permissions?.filter((permission) => permission.function == '/settings') ?? [];

    const getUsersForTable = useCallback(async () => {
        let users:User[] = await getUsers();
        users = users.filter((user) => user.id != auth?.user?.id)
        setDataSource(users)
    },[])

    const handleDelete = useCallback(async (id: number) => {
        await deleteUsers(id)
        await getUsersForTable();
    },[])

    useEffect(() => {
        getUsersForTable()
    }, [dataSource]);

    return (
        <>
            <div className="settings-page">
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
                        <Card title="Пользователи" className="card-container"
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
                                <Column title="Логин" dataIndex="login" key='login'/>
                                {(permissions[0].delete_permission || permissions[0].edit_permission) &&
                                    <Column
                                        title="Действия"
                                        key="action"
                                        render={(_: any, record) => (
                                            <Space size={"middle"}>
                                                <Button variant="solid" color="default"
                                                                           onClick={() => navigate(`view/${record.id}`)}>Подробнее</Button>
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