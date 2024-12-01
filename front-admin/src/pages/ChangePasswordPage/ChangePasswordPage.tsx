import {FC, useCallback} from "react";
import {Button, ConfigProvider, Form, Input} from "antd";
import "./ChangePasswordPage.scss"

export const ChangePasswordPage: FC = () => {
    const [form] = Form.useForm();

    const handlePasswordChange = useCallback(async () => {
        console.log("banane")
    },[])

    return (
        <>
            <div className="change-password-page">
                <Form form={form} onFinish={handlePasswordChange} className="change-password-form" layout="vertical">
                    <p className="form-name">Сменить пароль</p>
                    <ConfigProvider theme={{
                        components:{
                            Button: {
                                colorPrimary: "#04aa6d",
                                colorPrimaryHover: "#088557",
                                colorPrimaryActive: "#088557",
                                paddingBlock: 20,
                            },
                            Input: {
                                hoverBorderColor: "#04aa6d",
                                activeBorderColor: "#04aa6d"
                            }
                        },
                    }}
                    >
                        <Form.Item name="password" label="Текущий пароль"
                                   rules={[{required: true, message: "Введите текущий пароль"}]}
                                   className="change-password-form__input">
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item name="newPassword" label="Новый пароль"
                                   rules={[{required: true, message: "Введите новый пароль"}]}
                                   className="change-password-form__input">
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item name="newPasswordRepeat" label="Подтвердите пароль"
                                   rules={[{required: true, message: "Повторите новый пароль"}]}
                                   className="change-password-form__input">
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" block htmlType="submit" className="form-submit-button">Изменить пароль</Button>
                        </Form.Item>
                    </ConfigProvider>
                </Form>
            </div>
        </>
    )
}