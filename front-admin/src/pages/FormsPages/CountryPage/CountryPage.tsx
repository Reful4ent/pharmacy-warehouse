import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import {deleteCountry, getCountries} from "../../../shared/api";
import Column from "antd/es/table/Column";
import {useNavigate} from "react-router-dom";
import './CountryPage.scss'

export type Country = {
    id: number,
    name: string,
}

export const CountryPage: FC = () => {
    const [dataSource, setDataSource] = useState<Country[]>([]);
    const navigate = useNavigate();

    const getCountriesForTable = useCallback(async () => {
        const streets = await getCountries();
        setDataSource(streets)
    },[])

    const handleDelete = useCallback(async (id: number) => {
        await deleteCountry(id)
        await getCountriesForTable();
    },[])

    useEffect(() => {
        getCountriesForTable()
    }, [dataSource]);

    return (
        <>
            <div className="country-page">
                <ConfigProvider theme={{
                    components:{
                        Button: {
                            colorPrimary: "#04aa6d",
                            colorPrimaryHover: "#088557",
                            colorPrimaryActive: "#088557",
                        },
                    },
                }}>
                    <Card title="Страны" className="card-container" extra={<Button type="primary" onClick={() => navigate(`create`)} className="table-create-button">Добавить запись</Button>}>
                        <Table dataSource={dataSource} bordered>
                            <Column title="ID" dataIndex="id" key="id"/>
                            <Column title="Название" dataIndex="name" key='name'/>
                            <Column
                                title="Действия"
                                key="action"
                                render={(_: any, record) => (
                                    <Space size={"middle"}>
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