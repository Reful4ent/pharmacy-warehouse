import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import {deleteCategory, getCategories} from "../../../shared/api";
import Column from "antd/es/table/Column";
import {useNavigate} from "react-router-dom";
import './CategoryPage.scss'

export type Category = {
    id: number,
    name: string,
}

export const CategoryPage: FC = () => {
    const [dataSource, setDataSource] = useState<Category[]>([]);
    const navigate = useNavigate();

    const getCategoriesForTable = useCallback(async () => {
        const categories = await getCategories();
        setDataSource(categories)
    },[])

    const handleDelete = useCallback(async (id: number) => {
        await deleteCategory(id)
        await getCategoriesForTable();
    },[])

    useEffect(() => {
        getCategoriesForTable()
    }, [dataSource]);

    return (
        <>
            <div className="category-page">
                <ConfigProvider theme={{
                    components:{
                        Button: {
                            colorPrimary: "#04aa6d",
                            colorPrimaryHover: "#088557",
                            colorPrimaryActive: "#088557",
                        },
                    },
                }}>
                    <Card title="Категории медицинских товаров" className="card-container" extra={<Button type="primary" onClick={() => navigate(`create`)} className="table-create-button">Добавить запись</Button>}>
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