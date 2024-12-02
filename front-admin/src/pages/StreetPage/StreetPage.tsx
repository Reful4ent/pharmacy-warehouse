import {FC, useCallback, useEffect, useState} from "react";
import {Button,Space, Table} from "antd";
import {deleteStreet, getStreets} from "../../shared/api";
import Column from "antd/es/table/Column";
import {useNavigate} from "react-router-dom";

export type Street = {
    id: number,
    name: string,
}
export const StreetPage: FC = () => {
    const [dataSource, setDataSource] = useState<Street[]>([]);
    const navigate = useNavigate();

    const getStreetsForTable = useCallback(async () => {
        const streets = await getStreets();
        setDataSource(streets)
    },[])

    const handleDelete = useCallback(async (id: number) => {
        await deleteStreet(id)
        await getStreetsForTable();
    },[])

    useEffect(() => {
        getStreetsForTable()
    }, [dataSource]);

    return (
        <>
            <div>
                <Button type="primary" onClick={() => navigate(`create`)}>Добавить запись</Button>
                <h1>Улицы</h1>
                <Table dataSource={dataSource} bordered>
                    <Column title="ID" dataIndex="id" key="id"/>
                    <Column title="Название" dataIndex="name" key='name'/>
                    <Column
                        title="Действия"
                        key="action"
                        render={(_: any, record) => (
                            <Space size={"middle"}>
                                <Button type="link" onClick={() => navigate(`edit/${record.id}`)}>Редактировать</Button>
                                <Button type="link" onClick={() => handleDelete(record.id)}>Удалить</Button>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </>
    )
}