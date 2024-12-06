import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteProducer, /*getProducers, */ sendCustomRequest} from "../../../shared/api";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./ProducerPage.scss"
import {useConfig} from "../../../app/context/ConfigProvider/context.ts";

export type Producer = {
    id: number;
    name: string;
    country_id: number;
}



export const ProducerPage: FC = () => {
    const [dataSource, setDataSource] = useState<Producer[]>([]);
    const navigate = useNavigate();
    const config = useConfig()
    const permissions = config?.permissions?.filter((permission) => permission.function == '/producers') ?? [];

    const getProducersForTable = useCallback(async () => {
        //const employees = await getProducers();
        //setDataSource(employees)
        const result = await sendCustomRequest(`
                    SELECT 
                        producer.id,
                        producer.name,
                        country.name AS country_name
                    FROM 
                        producer
                    JOIN 
                        country ON producer.country_id = country.id`)
        setDataSource(result?.dataSource)
    },[])

    const handleDelete = useCallback(async (id: number) => {
        await deleteProducer(id)
        await getProducersForTable();
    },[])

    useEffect(() => {
        getProducersForTable()
    }, [dataSource]);

    return (
        <>
            <div className="producer-page">
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
                        <Card title="Производители" className="card-container"
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
                                <Column title="Страна производителя" dataIndex="country_name" key="country_name"/>
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
                    </ConfigProvider>
                    :
                    <p>У ВАС ОТСУТСТВУЕТ ДОСТУП, ОБРАТИТЕТСЬ К АДМИНИСТРАТОРУ, ДЛЯ ПОЛУЧЕНИЯ ДОСТУПА К ЭТОЙ СТРАНИЦЕ</p>
                }
            </div>
        </>
    )
}