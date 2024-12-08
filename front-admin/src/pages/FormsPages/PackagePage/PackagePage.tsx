import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Modal, Space, Table} from "antd";
import {deletePackage, getPackages} from "../../../shared/api";
import Column from "antd/es/table/Column";
import {useNavigate} from "react-router-dom";
import './PackagePage.scss'
import {useConfig} from "../../../app/context/ConfigProvider/context.ts";

export type Package = {
    id: number,
    name: string,
}

export const PackagePage: FC = () => {
    const [dataSource, setDataSource] = useState<Package[]>([]);
    const navigate = useNavigate();
    const config = useConfig()
    const permissions = config?.permissions?.filter((permission) => permission.function == '/packages') ?? [];
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<number>(0)

    const getPackagesForTable = useCallback(async () => {
        const packages = await getPackages();
        setDataSource(packages)
    },[])

    const handleDelete = useCallback( (id: number) => {
        setSelectedId(id);
        setIsOpen(true)
    },[])

    useEffect(() => {
        getPackagesForTable()
    }, [dataSource]);

    return (
        <>
            <div className="package-page">
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
                        <Card title="Упаковки" className="card-container"
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
                                <Column title="Название" dataIndex="name" key='name'/>
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
                                   await deletePackage(selectedId)
                                   await getPackagesForTable();
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