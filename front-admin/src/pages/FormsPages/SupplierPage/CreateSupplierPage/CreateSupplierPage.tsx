import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Form, Input, Select} from "antd";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate} from "react-router-dom";
import {createSupplier, getBanks, getStreets} from "../../../../shared/api";
import "./CreateSupplierPage.scss"
import {Bank} from "../../BankPage/BankPage.tsx";
import {Street} from "../../StreetPage/StreetPage.tsx";




export const CreateSupplierPage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [banksOptions, setBanksOptions] = useState()
    const [streetsOptions, setStreetsOptions] = useState()


    const handleCreate = useCallback(async () => {
        const supplier = form.getFieldsValue();
        const result = await createSupplier(supplier)
        if(result) {
            navigate('/suppliers')
        }
    },[])

    const getDataForForm = useCallback(async () => {
        const banks = await getBanks();
        const streets = await getStreets()
        const finallyBanks = banks.map((bank: Bank) => ({label: bank.name, value:bank.id}))
        const finallyStreets = streets.map((street: Street) => ({label: street.name, value:street.id}))
        setBanksOptions(finallyBanks)
        setStreetsOptions(finallyStreets)
    },[])

    useEffect(() => {
        getDataForForm()
    }, []);

    return (
        <>
            <div className="create-supplier-page">
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
                    <Card title="Создать компанию поставщика"
                          extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleCreate} className="form-container">
                            <Form.Item name="name" label="Название компании поставщика" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Банк" name='bank_id' rules={[{required: true}]}>
                                <Select
                                    showSearch
                                    options={banksOptions}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Местоположение" name='street_id' rules={[{required: true}]}>
                                <Select
                                    showSearch
                                    options={streetsOptions}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Номер телефона" name='phone_number' rules={[{required: true}]}>
                                <Input maxLength={11} type="number"/>
                            </Form.Item>
                            <Form.Item label="ИНН" name='tin' rules={[{required: true}]}>
                                <Input maxLength={12} type="number"/>
                            </Form.Item>
                            <Form.Item label="Рассчетный счет" name='current_account' rules={[{required: true}]}>
                                <Input maxLength={20} type="number"/>
                            </Form.Item>
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Создать производителя</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </ConfigProvider>
            </div>
        </>
    )
}