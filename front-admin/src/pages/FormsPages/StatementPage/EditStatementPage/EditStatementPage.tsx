import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, ConfigProvider, DatePicker, Form, Input, Modal, Row, Select, Typography} from "antd";
import dayjs from "dayjs";
import {
    getMedicines, getStatement, getSuppliers,
    sendCustomRequest,
    updateStatement
} from "../../../../shared/api";
import {Medicine} from "../../MedicinePage/MedicinePage.tsx";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {Supplier} from "../../SupplierPage/SupplierPage.tsx";
import './EditStatementPage.scss'

export const EditStatementPage: FC = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const { id } = useParams();
    const [supplierOptions, setSupplierOptions] = useState();
    const [medicineOptions, setMedicineOptions] = useState();
    const [medicines, setMedicines] = useState()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleUpdate = useCallback(async () => {
        const statements = form.getFieldsValue()
        const receiptFormatedDate = dayjs(statements.receipt_date.$d).format('YYYY-MM-DD')
        statements.receipt_date = receiptFormatedDate;

        const medicines = statements?.medicines?.map((medicine: any) => (
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

        const result = await updateStatement({
            id: Number(id),
            number: statements.number,
            receipt_date: statements.receipt_date,
            supplier_id: statements.supplier_id,
            total_sum: statements.total_sum,
        }, aggregatedMedicines)

        if(result) {
            navigate('/statements')
        }
    },[])

    const handleSubmit = useCallback(() => {
        setIsOpen(true)
    },[])

    const getData = useCallback(async () => {
        const statement = await getStatement(Number(id))
        statement.receipt_date = dayjs(statement.receipt_date.split('T')[0], 'YYYY-MM-DD');
        const responseTable = await sendCustomRequest(`SELECT
                                                                                                medicine.id,
                                                                                                medicine.name,
                                                                                                medicine.production_date,
                                                                                                medicine.registration_num,
                                                                                                medicine.expiration_date,
                                                                                                statements_medicine.price_that_time,
                                                                                                statements_medicine.quantity
                                                                                            FROM
                                                                                                statements_medicine
                                                                                            JOIN
                                                                                                medicine ON statements_medicine.medicine_id = medicine.id
                                                                                            WHERE
                                                                                                statements_medicine.statements_id = ${Number(id)}
        `)
        statement.medicines = responseTable.dataSource.map((data) => ({medicine: data.id, medicinePriceThatTime: data.price_that_time, medicineQuantity: data.quantity}))
        form.setFieldsValue(statement);
        const suppliers = await getSuppliers()
        const medicines = await getMedicines();
        const finallySuppliers = suppliers.map((supplier: Supplier) => ({label: supplier.name, value: supplier.id}))
        const finallyMedicines = medicines.map((medicine: Medicine) => ({label: medicine.name, value:medicine.id}))
        setSupplierOptions(finallySuppliers)
        setMedicineOptions(finallyMedicines)
        setMedicines(medicines)
    },[])

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="edit-statement-page">
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
                        title="Редактировать приходную накладную"
                        extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}
                    >
                        <Form form={form} layout="vertical" onFinish={handleSubmit} className="form-container">
                            <Form.Item label="Номер" name="number" key="number" rules={[{required: true}]}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item label="Дата приемки" name="receipt_date" key="receipt_date" rules={[{ required: true }]}>
                                <DatePicker/>
                            </Form.Item>
                            <Form.Item label="Поставщик" name="supplier_id" key="supplier_id" >
                                <Select
                                    showSearch
                                    options={supplierOptions}
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
                                                                <Input readOnly/>
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
                                                + Добавить лекарство
                                            </Button>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                            <Form.Item label="Сумма" name="total_sum" key="total_sum">
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Редактировать приходную накладную</Button>
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