import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Input, Modal, Space, Table} from "antd";
import { deleteStreet, getStreets} from "../../../shared/api";
import {useNavigate} from "react-router-dom";
import {useConfig} from "../../../app/context/ConfigProvider/context.ts";
import {SearchOutlined} from "@ant-design/icons";
import Column from "antd/es/table/Column";
import './StreetPage.scss'

export type Street = {
    id: number,
    name: string,
}

export const StreetPage: FC = () => {
    const navigate = useNavigate();
    const config = useConfig()
    const permissions = config?.permissions?.filter((permission) => permission.function == '/streets') ?? [];
    const [dataSource, setDataSource] = useState<Street[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<number>(0)


    const getStreetsForTable = useCallback(async () => {
        const streets = await getStreets();
        setDataSource(streets)
    },[])

    const handleStreetsSearch = useCallback(async (street: string) => {
        const streets = await getStreets(street);
        setDataSource(streets)
    },[])

    const handleDelete = useCallback( (id: number) => {
        setSelectedId(id);
        setIsOpen(true)
    },[])

    useEffect(() => {
        getStreetsForTable()
    }, [getStreetsForTable]);

    return (
        <>
            <div className="street-page">
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
                        <Card title="Улицы" className="card-container"
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
                                <Column
                                    title="Название"
                                    dataIndex="name"
                                    key='name'
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => handleStreetsSearch(e.target.value)}/>
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
                                   await deleteStreet(selectedId)
                                   await getStreetsForTable();
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