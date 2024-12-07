import {FC, useCallback} from "react";
import {Button, Card, ConfigProvider, Form, Input} from "antd";
import {useNavigate} from "react-router-dom";
import {createUser} from "../../../shared/api";
import {Arrow} from "../../../shared/components/SVG/Arrow/Arrow.tsx";
import './CreateSettingsUserPage.scss'


export const CreateSettingsUserPage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()


    const handleCreate = useCallback(async () => {
        const user = form.getFieldsValue();
        const result = await createUser(user);
        if(result) {
            navigate('/settings')
        }
    },[])

    return (
        <>
            <div className="create-user-page">
                <ConfigProvider theme={{
                    components:{
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
                    <Card title="Создать пользователя" extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleCreate} className="form-container">
                            <Form.Item name="login" label="Логин" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="password" label="Пароль" rules={[{required: true}]}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit" >Создать пользователя</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </ConfigProvider>
            </div>
        </>
    )
}