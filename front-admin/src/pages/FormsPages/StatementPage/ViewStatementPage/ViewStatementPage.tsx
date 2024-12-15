import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, ConfigProvider, Form, Input, Table} from "antd";
import {getStatement, getStatementMedicine} from "../../../../shared/api";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import Column from "antd/es/table/Column";
import {Statement} from "../StatementPage.tsx";
import './ViewStatementPage.scss'

export const ViewStatementPage: FC = () => {
    const { id} = useParams();
    const [form] = Form.useForm();
    const [statement, setStatement] = useState<Statement | null>(null);
    const navigate = useNavigate()
    const [dataSource, setDataSource] = useState();

    const getData = useCallback(async () => {
        const result = await getStatement(Number(id));
        const responseTable = await getStatementMedicine(Number(id))

        result['receipt_date'] = result['receipt_date'].split('T')[0]
        form.setFieldsValue(result)

        setStatement(result)
        setDataSource(responseTable)
    }, [])

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className="view-statement-page" >
                <ConfigProvider theme={{
                    components: {
                        Button: {
                            colorPrimary: "#04aa6d",
                            colorPrimaryHover: "#088557",
                            colorPrimaryActive: "#088557",
                        },
                        Input: {
                            hoverBorderColor: "#04aa6d",
                            activeBorderColor: "#04aa6d"
                        },
                        Select: {
                            hoverBorderColor: "#04aa6d",
                            activeBorderColor: "#04aa6d"
                        },
                        DatePicker: {
                            hoverBorderColor: "#04aa6d",
                            activeBorderColor: "#04aa6d"
                        }

                    },
                }}>
                    <Card
                        title={"Приходная накладная " + statement?.number}
                        extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item label="Дата приемки" name="receipt_date" key="receipt_date" >
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item label="Поставщик" name="supplier_name" key="supplier_name" >
                                <Input readOnly/>
                            </Form.Item>
                            <Table bordered dataSource={dataSource}>
                                <Column title="ID" dataIndex="id" key="id"/>
                                <Column title="Название" dataIndex="name" key='name'/>
                                <Column title="Дата производства" dataIndex="production_date" key="production_date" render={date => date.split('T')[0]}/>
                                <Column title="Срок годности" dataIndex="expiration_date" key="expiration_date" render={date => date.split('T')[0]}/>
                                <Column title="Регистрационный номер" dataIndex="registration_num"
                                        key="registration_num"/>
                                <Column title="Цена" dataIndex="price_that_time" key="price_that_time"/>
                                <Column title="Количество" dataIndex="quantity" key="quantity"/>
                            </Table>
                            <Form.Item label="Сумма" name="total_sum" key="total_sum" >
                                <Input readOnly/>
                            </Form.Item>
                        </Form>
                    </Card>
                </ConfigProvider>
            </div>
        </>
    )
}