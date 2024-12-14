import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, DatePicker, Form, Input, Modal, Select} from "antd";
import "./EditMedicinePage.scss"
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";
import {
    getCategories,
    getMedicine,
    getPackages,
    getProducers,
    updateMedicine
} from "../../../../shared/api";
import {Producer} from "../../ProducerPage/ProducerPage.tsx";
import {Package} from "../../PackagePage/PackagePage.tsx";
import {Category} from "../../CategoryPage/CategoryPage.tsx";

export const EditMedicinePage: FC = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const { id } = useParams();
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [producerOptions, setProducerOptions] = useState();
    const [packageOptions, setPackageOptions] = useState();
    const [categoryOptions, setCategoryOptions] = useState();
    const [dateError, setDateError] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleUpdate = useCallback(async () => {
        setDateError(false)
        const medicine = form.getFieldsValue()
        medicine['id'] = Number(id);
        const productionFormatedDate = dayjs(medicine.production_date.$d).format('YYYY-MM-DD')
        const expirationFormatedDate = dayjs(medicine.expiration_date.$d).format('YYYY-MM-DD')
        if(new Date(productionFormatedDate) > new Date(expirationFormatedDate)) {
            setDateError(true)
            return
        }
        medicine.production_date = productionFormatedDate;
        medicine.expiration_date = expirationFormatedDate
        const result = await updateMedicine(medicine)
        if(result) {
            setIsConfirm(true)
        }
    },[])

    const handleSubmit = useCallback(() => {
        setIsOpen(true)
    },[])

    const getDataForForm = useCallback(async () => {
        const medicine = await getMedicine(Number(id));
        medicine.production_date = dayjs(medicine.production_date.split('T')[0], 'YYYY-MM-DD');
        medicine.expiration_date = dayjs(medicine.expiration_date.split('T')[0], 'YYYY-MM-DD');
        form.setFieldsValue(medicine)
        const producers = await getProducers();
        const packages = await getPackages()
        const categories = await getCategories();
        const finallyProducers = producers.map((producer: Producer) => ({label: producer.name, value:producer.id}))
        const finallyPackages = packages.map((package_: Package) => ({label: package_.name, value: package_.id}))
        const finallyCategories = categories.map((category: Category) => ({label: category.name, value:category.id}))
        setProducerOptions(finallyProducers)
        setPackageOptions(finallyPackages)
        setCategoryOptions(finallyCategories)
    },[])

    useEffect(() => {
        getDataForForm()
    }, []);
    return (
        <>
            <div className="edit-medicine-page">
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
                    <Card title="Изменить лекарство" extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" className="form-container" onFinish={handleSubmit}>
                            <Form.Item label="Название" name="name" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Дата производства" name="production_date" rules={[{required: true}]}>
                                <DatePicker/>
                            </Form.Item>
                            <Form.Item label="Срок годности" name="expiration_date" rules={[{required: true}]}>
                                <DatePicker/>
                            </Form.Item>
                            {dateError &&
                                <p style={{color: "red", fontSize:"16px"}} >Дата срока годности не может быть меньше даты производства!</p>
                            }
                            <Form.Item label="Регистрационный номер" name="registration_num" rules={[{required: true}]}>
                                <Input maxLength={20}/>
                            </Form.Item>
                            <Form.Item label="Производитель" name="producer_name" rules={[{required: true}]}>
                                <Select
                                    mode="multiple"
                                    showSearch
                                    options={producerOptions}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Упаковка" name="package_name" rules={[{required: true}]}>
                                <Select
                                    mode="multiple"
                                    showSearch
                                    options={packageOptions}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Категории" name="category_names" rules={[{required: true}]}>
                                <Select mode="multiple"
                                        showSearch
                                        options={categoryOptions}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                        }
                                />
                            </Form.Item>
                            <Form.Item label="Цена" name="price" rules={[{required: true}]}>
                                <Input maxLength={10} type="number"/>
                            </Form.Item>
                            {isConfirm &&
                                <p className="finished-message">Лекарство успешно обновлено!</p>
                            }
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Изменить лекарство</Button>
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
