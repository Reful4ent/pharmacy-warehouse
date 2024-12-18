import {FC, useState} from "react";
import {Button, Card, ConfigProvider, Input, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import './DocsPage.scss'
import {Link} from "react-router-dom";


export type TableName = {
    name: string;
    nameInBD: string;
}



export const DocsPage: FC = () => {
    const [inputField, setInputField] = useState('')

    const initialTableNames: TableName[] = [
        { name: 'Счет-фактуры', nameInBD: 'invoice'},
    ]

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
                                width="30%"
                                render={(_: any, record) => (
                                    <Space size={"middle"}>
                                        <Input prefix={'Номер счет-фактуры:'} onChange={(e) => setInputField(e.target.value)}/>
                                        <Button style={{backgroundColor: "#1E90FF", color: "white"}}><Link to={'http://localhost:1337/api/word/create/' + record.nameInBD + '?number=' + inputField} target="_blank">Word</Link></Button>
                                        <Button type="primary"><Link to={'http://localhost:1337/api/excel/create/' + record.nameInBD + '?number=' + inputField} target="_blank">Excel</Link></Button>
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