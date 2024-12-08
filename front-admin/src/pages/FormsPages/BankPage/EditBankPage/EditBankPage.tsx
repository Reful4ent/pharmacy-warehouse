import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Form, Input, Modal} from "antd";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {getBank, updateBank} from "../../../../shared/api";
import {Bank} from "../BankPage.tsx";
import "./EditBankPage.scss"


export const EditBankPage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false)



    const handleUpdate = useCallback(async () => {
        setIsConfirm(false)
        const bank: Bank = {
            id: Number(id),
            name: form.getFieldValue('name')
        }
        const result = await updateBank(bank)
        if(result) {
            setIsConfirm(true)
        }
    },[])

    const handleSubmit = useCallback(() => {
        setIsOpen(true)
    },[])


    const getData = useCallback(async () => {
        const result = await getBank(Number(id));
        form.setFieldsValue(result)
    },[])

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className="edit-bank-page">
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
                        }
                    },
                }}>
                    <Card title="Изменить банк"
                          extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleSubmit} className="form-container">
                            <Form.Item
                                name="name"
                                label="Название банка"
                                rules={[{required: true, message: "Поле 'Название банка' является обязательным"}]}
                            >
                                <Input/>
                            </Form.Item>
                            {isConfirm &&
                                <p className="finished-message">Банк успешно обновлен!</p>
                            }
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Изменить банк</Button>
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