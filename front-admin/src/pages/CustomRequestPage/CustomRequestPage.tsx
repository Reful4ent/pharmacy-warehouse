import {FC, useCallback, useState} from "react";
import {Button, ConfigProvider, Table} from "antd";
import "./CustomRequestPage.scss"
import TextArea from "antd/es/input/TextArea";
import {sendCustomRequest, TableColumns} from "../../shared/api";


export const CustomRequestPage: FC = () => {

    const [windowRequestText, setWindowRequestText] = useState<string>('')
    const [dataSource, setDataSource] = useState();
    const [error, setError] = useState<string>('')
    const [columns, setColumns] = useState<TableColumns[] | undefined>([]);



    const handleRequestSubmit = useCallback(async () => {
        const result = await sendCustomRequest(windowRequestText)
        setDataSource(result?.dataSource)
        setColumns(result?.columns)
        setError(result?.error)
    },[windowRequestText])

    return (
        <div className="request-page">
            <div className="window-request">
                <TextArea className="window-request__input" onChange={(event) => setWindowRequestText(event.target.value)}/>
                <ConfigProvider theme={{
                    components:{
                        Button: {
                            colorPrimary: "#04aa6d",
                            colorPrimaryHover: "#088557",
                            colorPrimaryActive: "#088557",
                            paddingBlock: 20,
                        }
                    },
                }}
                >
                    <Button className="window-request__button" type="primary" onClick={handleRequestSubmit}>Отправить запрос</Button>
                </ConfigProvider>
            </div>
            <p className="error">{error}</p>
            <Table dataSource={dataSource} columns={columns} className="data-table"/>
        </div>
    )
}