import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Form, Input, Select} from "antd";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {getCountries, getProducer, updateProducer} from "../../../../shared/api";
import "./EditProducerPage.scss"
import {Country} from "../../CountryPage/CountryPage.tsx";



export const EditProducerPage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [countryOptions, setCountryOptions] = useState()


    const handleUpdate = useCallback(async () => {
        setIsConfirm(false)
        const producer = form.getFieldsValue();
        producer['id'] = Number(id);
        const result = await updateProducer(producer)
        if(result) {
            setIsConfirm(true)
        }
    },[])


    const getData = useCallback(async () => {
        const countries = await getCountries();
        const employee = await getProducer(Number(id))
        const finallyCountries = countries.map((country: Country) => ({label: country.name, value:country.id}))
        setCountryOptions(finallyCountries)
        form.setFieldsValue(employee);
    },[])

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className="edit-producer-page">
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
                    <Card title="Изменить производителя"
                          extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleUpdate} className="form-container">
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
                            {isConfirm &&
                                <p className="finished-message">Производитель успешно обновлен!</p>
                            }
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Изменить производителя</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </ConfigProvider>
            </div>
        </>
    )
}