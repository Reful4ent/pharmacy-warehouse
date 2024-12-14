import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, ConfigProvider, Form, Input, Table} from "antd";
import "./ViewInvoicePage.scss"
import {getInvoice, sendCustomRequest} from "../../../../shared/api";
import {Invoice} from "../InvoicePage.tsx";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import Column from "antd/es/table/Column";


export const ViewInvoicePage: FC = () => {
    const { id} = useParams();
    const [form] = Form.useForm();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const navigate = useNavigate()
    const [dataSource, setDataSource] = useState();

    const getData = useCallback(async () => {
        const result = await getInvoice(Number(id));
        setInvoice(result)
        result['discharge_date'] = result['discharge_date'].split('T')[0]
        form.setFieldsValue(result)
        const responseTable = await sendCustomRequest(`SELECT
                                                                                               medicine.id,
                                                                                                medicine.name,
                                                                                                medicine.production_date,
                                                                                                medicine.registration_num,
                                                                                                medicine.expiration_date,
                                                                                                invoice_medicine.price_that_time,
                                                                                                invoice_medicine.quantity
                                                                                            FROM
                                                                                                invoice_medicine
                                                                                            JOIN
                                                                                                medicine ON invoice_medicine.medicine_id = medicine.id
                                                                                            WHERE
                                                                                                invoice_medicine.invoice_id = ${Number(id)}`)
        setDataSource(responseTable?.dataSource)
    }, [])

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className="view-invoice-page" >
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
                        title={"Счет фактура " + invoice?.number}
                        extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item label="Дата поступления" name="discharge_date" key="discharge_date" >
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item label="Сотрудник" name="surname" key="surname" >
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item label="Покупатель" name="name" key="name" >
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