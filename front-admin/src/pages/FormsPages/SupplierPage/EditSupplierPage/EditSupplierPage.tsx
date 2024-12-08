import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Form, Input, Modal, Select} from "antd";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {getBanks, getStreets, getSupplier, updateSupplier} from "../../../../shared/api";
import "./EditSupplierPage.scss"
import {Bank} from "../../BankPage/BankPage.tsx";
import {Street} from "../../StreetPage/StreetPage.tsx";




export const EditSupplierPage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [banksOptions, setBanksOptions] = useState()
    const [streetsOptions, setStreetsOptions] = useState()
    const [isOpen, setIsOpen] = useState<boolean>(false)


    const handleUpdate = useCallback(async () => {
        setIsConfirm(false)
        const supplier = form.getFieldsValue();
        supplier['id'] = Number(id);
        const result = await updateSupplier(supplier)
        if(result){
            setIsConfirm(true)
        }
    },[])

    const handleSubmit = useCallback(() => {
        setIsOpen(true)
    },[])

    const getDataForForm = useCallback(async () => {
        const banks = await getBanks();
        const streets = await getStreets()
        const buyer = await getSupplier(Number(id))
        const finallyBanks = banks.map((bank: Bank) => ({label: bank.name, value:bank.id}))
        const finallyStreets = streets.map((street: Street) => ({label: street.name, value:street.id}))
        setBanksOptions(finallyBanks)
        setStreetsOptions(finallyStreets)
        form.setFieldsValue(buyer)
    },[])

    useEffect(() => {
        getDataForForm()
    }, []);

    return (
        <>
            <div className="edit-supplier-page">
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
                    <Card title="Изменить компанию поставщика"
                          extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleSubmit} className="form-container">
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
                            {isConfirm &&
                                <p className="finished-message">Покупатель успешно обновлен!</p>
                            }
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Изменить покупателя</Button>
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