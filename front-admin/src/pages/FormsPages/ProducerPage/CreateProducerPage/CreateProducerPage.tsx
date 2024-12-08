import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Form, Input, Modal, Select} from "antd";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate} from "react-router-dom";
import {createProducer, getCountries,} from "../../../../shared/api";
import "./CreateProducerPage.scss"
import {Country} from "../../CountryPage/CountryPage.tsx";



export const CreateProducerPage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [countryOptions, setCountryOptions] = useState()
    const [isOpen, setIsOpen] = useState<boolean>(false)


    const handleCreate = useCallback(async () => {
        const producer = form.getFieldsValue();
        const result = await createProducer(producer)
        if(result){
            navigate('/producers')
        }
    },[])

    const getPostsForForm = useCallback(async () => {
        const countries = await getCountries();
        const finallyCountries = countries.map((country: Country) => ({label: country.name, value:country.id}))
        setCountryOptions(finallyCountries)
    },[])

    const handleSubmit = useCallback(() => {
        setIsOpen(true)
    },[])

    useEffect(() => {
        getPostsForForm()
    }, []);

    return (
        <>
            <div className="create-producer-page">
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
                        }
                    },
                }}>
                    <Card title="Создать производителя"
                          extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleSubmit} className="form-container">
                            <Form.Item name="name" label="Название производителя" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Страна производителя" name='country_id' rules={[{required: true}]}>
                                <Select
                                    showSearch
                                    options={countryOptions}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Создать производителя</Button>
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