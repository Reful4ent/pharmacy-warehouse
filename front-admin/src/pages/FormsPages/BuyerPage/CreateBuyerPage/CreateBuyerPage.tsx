import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Form, Input, Modal, Select} from "antd";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate} from "react-router-dom";
import {createBuyer, getBanks, getStreets} from "../../../../shared/api";
import "./CreateBuyerPage.scss"
import {Bank} from "../../BankPage/BankPage.tsx";
import {Street} from "../../StreetPage/StreetPage.tsx";




export const CreateBuyerPage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [banksOptions, setBanksOptions] = useState()
    const [streetsOptions, setStreetsOptions] = useState()
    const [isOpen, setIsOpen] = useState<boolean>(false)


    const handleCreate = useCallback(async () => {
        const buyer = form.getFieldsValue();
        const result = await createBuyer(buyer)
        if(result) {
            navigate('/buyers')
        }
    },[])

    const handleSubmit = useCallback(() => {
        setIsOpen(true)
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
            <div className="create-buyer-page">
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
                    <Card title="Создать компанию покупателя"
                          extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleSubmit} className="form-container">
                            <Form.Item name="name" label="Название компании покупателя" rules={[{required: true}]}>
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
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Создать сотдрудника</Button>
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