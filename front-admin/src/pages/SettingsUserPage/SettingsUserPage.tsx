import {FC, useCallback, useEffect, useState} from "react";
import "./SettingsUserPage.scss"
import {useNavigate} from "react-router-dom";
import {useConfig} from "../../app/context/ConfigProvider/context.ts";
import {deleteUsers, getUsers} from "../../shared/api";
import {Button, Card, ConfigProvider, Modal, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import {User} from "../../app/context/AuthProvider/types.ts";
import {useAuth} from "../../app/context/AuthProvider/context.ts";


export const SettingsUserPage: FC = () => {
    const [dataSource, setDataSource] = useState<User[]>([]);
    const navigate = useNavigate();
    const config = useConfig()
    const auth = useAuth()
    const permissions = config?.permissions?.filter((permission) => permission.function == '/settings') ?? [];
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<number>(0)

    const getUsersForTable = useCallback(async () => {
        let users:User[] = await getUsers();
        users = users.filter((user) => user.id != auth?.user?.id)
        setDataSource(users)
    },[])

    const handleDelete = useCallback( (id: number) => {
        setSelectedId(id);
        setIsOpen(true)
    },[])

    useEffect(() => {
        getUsersForTable()
    }, [getUsersForTable]);

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
                                <Column title="ID" dataIndex="id" key="id" width="3%"/>
                                <Column title="Логин" dataIndex="login" key='login'/>
                                {(permissions[0].delete_permission || permissions[0].edit_permission) &&
                                    <Column
                                        title="Действия"
                                        key="action"
                                        width="15%"
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
                        <Modal open={isOpen}
                               onCancel={() => setIsOpen(false)}
                               title="Вы точно хотите удалить?"
                               cancelText="Нет"
                               okText="Удалить"
                               okType="danger"
                               onOk={async () => {
                                   setIsOpen(false);
                                   await deleteUsers(selectedId)
                                   await getUsersForTable();
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