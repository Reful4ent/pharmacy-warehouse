import {FC, useCallback, useState} from "react";
import {Button, ConfigProvider, Form, Input} from "antd";
import "./ChangePasswordPage.scss"
import {useAuth} from "../../app/context/AuthProvider/context.ts";

export const ChangePasswordPage: FC = () => {
    const auth = useAuth();
    const [form] = Form.useForm();
    const [error, setError] = useState<string>('')
    const [finished, setFinished] = useState<boolean>(false)

    const handlePasswordChange = useCallback(async () => {
        setFinished(false)

        const currentPassword = form.getFieldValue('password');
        const newPassword = form.getFieldValue('newPassword');
        const newPasswordRepeat = form.getFieldValue('newPasswordRepeat')

        if(currentPassword !== auth?.user?.password) {
            setError("Введите верный текущий пароль")
            return;
        }

        if(newPassword !== newPasswordRepeat) {
            setError("Новые пароли должны совпадать!")
            return;
        }

        const resultOfUpdate = await auth?.updateUser({
            id: auth?.user?.id,
            login: auth?.user?.login,
            password: newPassword,
        })

        if (resultOfUpdate) {
            setFinished(true)
            setError('')
        } else {
            setFinished(false)
            setError('')
        }
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
                        {error &&
                            <p className='error-message'>{error}</p>
                        }
                        {finished &&
                            <p className="finished-message">Пароль был успешно сменен!</p>
                        }
                        <Form.Item>
                            <Button type="primary" block htmlType="submit" className="form-submit-button">Изменить пароль</Button>
                        </Form.Item>
                    </ConfigProvider>
                </Form>
            </div>
        </>
    )
}