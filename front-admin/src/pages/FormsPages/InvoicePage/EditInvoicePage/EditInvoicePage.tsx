import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, Col, ConfigProvider, DatePicker, Form, Input, Modal, Row, Select, Typography} from "antd";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";
import {
    getBuyers,
    getEmployees,
    getInvoice,
    getMedicines, sendCustomRequest,
} from "../../../../shared/api";
import {Employee} from "../../EmployeePage/EmployeePage.tsx";
import {Buyer} from "../../BuyerPage/BuyerPage.tsx";
import {Medicine} from "../../MedicinePage/MedicinePage.tsx";
import './EditInvoicePage.scss'

export const EditInvoicePage: FC = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const { id } = useParams();
    const [employeeOptions, setEmployeeOptions] = useState();
    const [buyerOptions, setBuyerOptions] = useState();
    const [medicineOptions, setMedicineOptions] = useState();
    const [medicines, setMedicines] = useState()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleUpdate = useCallback(async () => {
        console.log(form.getFieldsValue())
    },[])

    const handleSubmit = useCallback(() => {
        setIsOpen(true)
    },[])

    const getData = useCallback(async () => {
        const invoice = await getInvoice(Number(id))
        invoice.discharge_date = dayjs(invoice.discharge_date.split('T')[0], 'YYYY-MM-DD');
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
                                                                                                invoice_medicine.invoice_id = ${Number(id)}
        `)
        invoice.medicines = responseTable.dataSource.map((data) => ({medicine: data.id, medicinePriceThatTime: data.price_that_time, medicineQuantity: data.quantity}))
        form.setFieldsValue(invoice);
        const employees = await getEmployees()
        const buyers = await getBuyers();
        const medicines = await getMedicines();
        const finallyEmployees = employees.map((employee: Employee) => ({label: employee.surname, value: employee.id}))
        const finallyBuyers = buyers.map((buyer: Buyer) => ({label: buyer.name, value:buyer.id}))
        const finallyMedicines = medicines.map((medicine: Medicine) => ({label: medicine.name, value:medicine.id}))
        setBuyerOptions(finallyBuyers)
        setEmployeeOptions(finallyEmployees)
        setMedicineOptions(finallyMedicines)
        setMedicines(medicines)
    },[])

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="edit-invoice-page">
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
                        title="Редактировать счет фактуру"
                        extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}
                    >
                        <Form form={form} layout="vertical" onFinish={handleSubmit} className="form-container">
                            <Form.Item label="Номер" name="number" key="number" rules={[{required: true}]}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item label="Дата поступления" name="discharge_date" key="discharge_date"
                                       rules={[{required: true}]}>
                                <DatePicker/>
                            </Form.Item>
                            <Form.Item label="Сотрудник" name="employee_id" key="employee_id" rules={[{required: true}]}>
                                <Select
                                    showSearch
                                    options={employeeOptions}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Покупатель" name="buyer_id" key="buyer_id" rules={[{required: true}]}>
                                <Select
                                    showSearch
                                    options={buyerOptions}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            <Form.Item>
                                <Typography.Title level={4}>Лекарства</Typography.Title>
                                <Form.List name="medicines">
                                    {(fields, {add, remove}) => (
                                        <>
                                            <Row gutter={20}>
                                                {fields.map((field, index) => (
                                                    <Col style={{width: '25%', marginBottom: 20}} key={index}>
                                                        <Card
                                                            size="small"
                                                            title={`Лекарство ${index + 1}`}
                                                            key={field.key}
                                                            extra={<Button variant="solid" color="danger"
                                                                           onClick={() => {
                                                                               if (form.getFieldValue('medicines').length == 1)
                                                                                   form.setFieldValue('total_sum', 0);

                                                                               remove(field.name)
                                                                           }} children={"X"}/>}
                                                        >
                                                            <Form.Item
                                                                label="Лекарство"
                                                                required
                                                                name={[field.name, 'medicine']}
                                                                rules={[{required: true}]}
                                                            >
                                                                <Select
                                                                    showSearch
                                                                    options={medicineOptions}
                                                                    filterOption={(input, option) =>
                                                                        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                                                    }
                                                                    onChange={(value) => {
                                                                        const selectedMedicine = medicines.find(m => m.id === value);
                                                                        form.setFieldsValue({
                                                                            medicines: {
                                                                                [field.name]: {
                                                                                    ...form.getFieldValue(['medicines', field.name]),
                                                                                    medicinePriceThatTime: selectedMedicine.price,
                                                                                },
                                                                            },
                                                                        });

                                                                    }}
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Цена на момент оформления"
                                                                required
                                                                name={[field.name, 'medicinePriceThatTime']}
                                                                rules={[{required: true}]}
                                                            >
                                                                <Input/>
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Количество"
                                                                required
                                                                name={[field.name, 'medicineQuantity']}
                                                                rules={[{required: true}]}
                                                            >
                                                                <Input
                                                                    type="number"
                                                                    disabled={form.getFieldValue('medicines')[index].medicine ? false : true}
                                                                    onChange={() => {
                                                                        let totalSum = 0;
                                                                        for (let i = 0; i < form.getFieldValue('medicines').length; i++) {
                                                                            const price = form.getFieldValue('medicines')[i].medicinePriceThatTime
                                                                            const quantity = form.getFieldValue('medicines')[i].medicineQuantity
                                                                            totalSum += price * quantity;
                                                                        }
                                                                        form.setFieldValue('total_sum', totalSum)
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>

                                            <Button type="dashed" block
                                                    onClick={() => add({type: 'product.extra-image', url: ''})}>
                                                + Добавить слайд
                                            </Button>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                            <Form.Item label="Сумма" name="total_sum" key="total_sum">
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Редактировать счет-фактуру</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    <Modal open={isOpen}
                           onCancel={() => setIsOpen(false)}
                           title="Вы точно хотите изменить?"
                           cancelText="Назад"
                           okText="Изменить"
                           onOk={() => {
                               setIsOpen(false)
                               handleUpdate()
                           }}
                    />
                </ConfigProvider>
            </div>
        </>
    )
}