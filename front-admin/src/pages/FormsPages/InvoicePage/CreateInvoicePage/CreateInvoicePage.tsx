import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, Col, ConfigProvider, DatePicker, Form, Input, Modal, Row, Select, Typography} from "antd";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate} from "react-router-dom";
import {createInvoice, getBuyers, getEmployees, getMedicines, sendCustomRequest} from "../../../../shared/api";
import {Employee} from "../../EmployeePage/EmployeePage.tsx";
import {Buyer} from "../../BuyerPage/BuyerPage.tsx";
import {Medicine} from "../../MedicinePage/MedicinePage.tsx";
import "./CreateInvoicePage.scss"
import dayjs from "dayjs";


/*
* await createInvoice({
            id: null,
            number: invoice.number,
            discharge_date: invoice.discharge_date,
            employee_id: invoice.surname,
            buyer_id: invoice.name,
            total_sum: invoice.total_sum
        }, medicines)*/

export const CreateInvoicePage: FC = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [employeeOptions, setEmployeeOptions] = useState();
    const [buyerOptions, setBuyerOptions] = useState();
    const [medicineOptions, setMedicineOptions] = useState();
    const [medicines, setMedicines] = useState()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleCreate = useCallback(async () => {
        const invoice = form.getFieldsValue()
        console.log(invoice)
        const productionFormatedDate = dayjs(invoice.discharge_date.$d).format('YYYY-MM-DD')
        invoice.discharge_date = productionFormatedDate;

        const medicines = invoice?.medicines?.map((medicine: any) => (
            {
                medicine_id: medicine.medicine,
                price_that_time: medicine.medicinePriceThatTime,
                quantity: medicine.medicineQuantity
        }))

        const aggregatedMedicines = medicines.reduce((acc, current) => {
            const existing = acc.find(item => item.medicine_id === current.medicine_id);
            if (existing) {
                existing.quantity = (parseInt(existing.quantity) + parseInt(current.quantity)).toString();
            } else {
                acc.push({ ...current });
            }

            return acc;
        }, []);

        const result = await createInvoice({
            id: null,
            number: invoice.number,
            discharge_date: invoice.discharge_date,
            employee_id: invoice.surname,
            buyer_id: invoice.name,
            total_sum: invoice.total_sum
        }, aggregatedMedicines)

        if(result) {
            navigate('/invoices')
        }

    },[])

    const handleSubmit = useCallback(() => {
        setIsOpen(true)
    },[])

    const getData = useCallback(async () => {
        const response = await sendCustomRequest(`SELECT MAX(id) AS max_id FROM invoice`)
        let max_id = response.dataSource[0].max_id + 1;
        const length = String(max_id).length;
        for(let i = 0; i<10-length; i++)
            max_id = '0' + max_id;
        form.setFieldValue('number', max_id)
        form.setFieldValue('total_sum', 0)

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
            <div className="create-invoice-page">
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
                        title="Cоздать счет фактуру"
                        extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}
                    >
                        <Form form={form} layout="vertical" onFinish={handleSubmit} className="form-container">
                            <Form.Item label="Номер" name="number" key="number" rules={[{ required: true }]}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item label="Дата поступления" name="discharge_date" key="discharge_date" rules={[{ required: true }]}>
                                <DatePicker/>
                            </Form.Item>
                            <Form.Item label="Сотрудник" name="surname" key="surname" rules={[{ required: true }]}>
                                <Select
                                    showSearch
                                    options={employeeOptions}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Покупатель" name="name" key="name" rules={[{ required: true }]}>
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
                                    {(fields, { add, remove }) => (
                                        <>
                                            <Row gutter={20}>
                                                {fields.map((field, index) => (
                                                    <Col style={{ width: '25%', marginBottom: 20 }} key={index}>
                                                        <Card
                                                            size="small"
                                                            title={`Лекарство ${index + 1}`}
                                                            key={field.key}
                                                            extra={<Button variant="solid" color="danger" onClick={() => {
                                                                if (form.getFieldValue('medicines').length == 1)
                                                                    form.setFieldValue('total_sum', 0);

                                                                remove(field.name)
                                                            }} children={"X"}/>}
                                                        >
                                                            <Form.Item
                                                                label="Лекарство"
                                                                required
                                                                name={[field.name, 'medicine']}
                                                                rules={[{ required: true }]}
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
                                                                rules={[{ required: true }]}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Количество"
                                                                required
                                                                name={[field.name, 'medicineQuantity']}
                                                                rules={[{ required: true }]}
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

                                            <Button type="dashed" block onClick={() => add({ type: 'product.extra-image', url: '' })}>
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
                                <Button type="primary" htmlType="submit">Создать счет-фактуру</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    <Modal open={isOpen}
                           onCancel={() => setIsOpen(false)}
                           title="Вы точно хотите создать?"
                           cancelText="Назад"
                           okText="Создать"
                           onOk={handleCreate}
                    />
                </ConfigProvider>
            </div>
        </>
    )
}