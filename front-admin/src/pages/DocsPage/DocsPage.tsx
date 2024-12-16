import {FC, useCallback} from "react";
import {Button, Card, ConfigProvider, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import './DocsPage.scss'
import {createExcel} from "../../shared/api";
import {Link} from "react-router-dom";


export type TableName = {
    name: string;
    nameInBD: string;
}



export const DocsPage: FC = () => {

    const initialTableNames: TableName[] = [
        { name: 'Лекарства', nameInBD: 'medicine'},
        { name: 'Сотрудники', nameInBD: 'employee'},
        { name: 'Поставщики', nameInBD: 'supplier'},
        { name: 'Производители', nameInBD: 'producer'},
        { name: 'Покупатели', nameInBD: 'buyer'},
        { name: 'Счет-фактуры', nameInBD: 'invoice'},
        { name: 'Приходные накладные', nameInBD: 'statements'},
        { name: 'Упаковки', nameInBD: 'package'},
        { name: 'Категории', nameInBD: 'category'},
        { name: 'Страны', nameInBD: 'country'},
        { name: 'Банки', nameInBD: 'bank'},
        { name: 'Должности', nameInBD: 'post'},
        { name: 'Улицы', nameInBD: 'street'},
    ]

    const handleExcelCreate = useCallback(async (name: string) => {
        await createExcel(name);
    },[])

    const handleWordExcel = useCallback(async (name: string) => {

    },[])

    return (
        <>
            <div className='docs-page'>
                <ConfigProvider theme={{
                    components: {
                        Button: {
                            colorPrimary: "#04aa6d",
                            colorPrimaryHover: "#088557",
                            colorPrimaryActive: "#088557",
                        },
                    },
                }}>
                    <Card>
                        <Table dataSource={initialTableNames}>
                            <Column title="Таблицы для выгрузки" dataIndex="name" key="name"/>
                            <Column
                                title="Действия"
                                key="action"
                                width="10%"
                                render={(_: any, record) => (
                                    <Space size={"middle"}>
                                        <Button style={{backgroundColor: "#1E90FF", color: "white"}} onClick={() => handleWordExcel(record.nameInBD)}>Word</Button>
                                        <Button type="primary"><Link to={'http://localhost:1337/api/excel/create/' + record.nameInBD} target="_blank">Excel</Link></Button>
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