import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, DatePicker, Form, Input, Select} from "antd";
import './CreateMedicinePage.scss'
import {useNavigate} from "react-router-dom";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {
    createMedicine,
    getCategories,
    getPackages,
    getProducers
} from "../../../../shared/api";
import {Producer} from "../../ProducerPage/ProducerPage.tsx";
import {Package} from "../../PackagePage/PackagePage.tsx";
import {Category} from "../../CategoryPage/CategoryPage.tsx";
import dayjs from 'dayjs';

export const CreateMedicinePage: FC = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [producerOptions, setProducerOptions] = useState();
    const [packageOptions, setPackageOptions] = useState();
    const [categoryOptions, setCategoryOptions] = useState();

    const handleCreate = useCallback(async () => {
        const medicine = form.getFieldsValue()
        const productionFormatedDate = dayjs(medicine.production_date.$d).format('YYYY-MM-DD')
        const expirationFormatedDate = dayjs(medicine.expiration_date.$d).format('YYYY-MM-DD')
        medicine.production_date = productionFormatedDate;
        medicine.expiration_date = expirationFormatedDate
        const result = await createMedicine(medicine)
        if(result) {
            navigate('/medicines')
        }
    },[])

    const getDataForForm = useCallback(async () => {
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
            <div className='create-medicine-page'>
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
                    <Card title="Создать лекарство" extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" className="form-container" onFinish={handleCreate}>
                            <Form.Item label="Название" name="name" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Дата производства" name="production_date" rules={[{required: true}]}>
                                <DatePicker/>
                            </Form.Item>
                            <Form.Item label="Срок годности" name="expiration_date" rules={[{required: true}]}>
                                <DatePicker/>
                            </Form.Item>
                            <Form.Item label="Регистрационный номер" name="registration_num" rules={[{required: true}]}>
                                <Input maxLength={20}/>
                            </Form.Item>
                            <Form.Item label="Производитель" name="producer_name" rules={[{required: true}]}>
                                <Select
                                    showSearch
                                    options={producerOptions}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Упаковка" name="package_name" rules={[{required: true}]}>
                                <Select
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
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Создать сотдрудника</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </ConfigProvider>
            </div>
        </>
    )
}