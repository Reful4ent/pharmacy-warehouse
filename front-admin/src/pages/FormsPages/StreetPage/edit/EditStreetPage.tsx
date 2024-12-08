import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Form, Input, Modal} from "antd";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {getStreet, updateStreet} from "../../../../shared/api";
import {Street} from "../StreetPage.tsx";
import "./EditStreetPage.scss"


export const EditStreetPage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false)



    const handleUpdate = useCallback(async () => {
        setIsConfirm(false)
        const street: Street = {
            id: Number(id),
            name: form.getFieldValue('name')
        }
        const result = await updateStreet(street)
        if(result) {
            setIsConfirm(true)
        }
    },[])

    const handleSubmit = useCallback(() => {
        setIsOpen(true)
    },[])

    const getData = useCallback(async () => {
        const result = await getStreet(Number(id));
        form.setFieldsValue(result)
    },[])

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className="edit-street-page">
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
                    <Card title="Изменить улицу"
                          extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleSubmit} className="form-container">
                            <Form.Item name="name" label="Название улицы" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            {isConfirm &&
                                <p className="finished-message">Улица успешно обновлена!</p>
                            }
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Изменить улицу</Button>
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