import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, Checkbox, CheckboxProps, ConfigProvider, Form, Input} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {getUserPermissions, getUsers, updateUserPermissions} from "../../../shared/api";
import {Arrow} from "../../../shared/components/SVG/Arrow/Arrow.tsx";
import "./EditSettingsUserPage.scss"
import {Permission} from "../../../shared/api/types.ts";
import {router} from "../../../app/router/router.tsx";


export const EditSettingsUserPage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const {id} = useParams();
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [permissions, setPermissions] = useState<Permission[] | null>([])



    const getData = useCallback(async () => {
        const result = await getUsers({id: Number(id), login: null, password: null});
        const permissions = await getUserPermissions(Number(id))
        setPermissions(permissions)
        form.setFieldsValue({login: result[0].login})
    }, [])

    const checkboxChanged: CheckboxProps['onChange'] = (e) => {
        const [type, menu_item_id] = e.target.value.split(' ');
        const tempPermissions = permissions?.map((permission) => {
            if (permission.menu_item_id == menu_item_id) {
                const updatedPermission = {
                    ...permission,
                    ...(type === 'READ' ? { read_permission: e.target.checked } : {}),
                    ...(type === 'WRITE' ? { write_permission: e.target.checked } : {}),
                    ...(type === 'EDIT' ? { edit_permission: e.target.checked } : {}),
                    ...(type === 'DELETE' ? { delete_permission: e.target.checked } : {}),
                };
                return updatedPermission;
            }
            return permission;
        }) ?? [];

        setPermissions(tempPermissions);
    };

    //TODO: доделать смену пароля
    const handleUpdate = useCallback(async () => {
        setIsConfirm(false)
        if (permissions) {
            for (const permission of permissions) {
                await updateUserPermissions(permission)
            }
            navigate('/settings')
        }
    }, [permissions])

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className="edit-user-page">
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
                    <Card title="Изменить пользователя"
                          extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleUpdate} className="form-container">
                            <Form.Item name="login" label="Логин" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name="password" label="Пароль" rules={[{required: true}]}>
                                <Input.Password/>
                            </Form.Item>
                            {isConfirm &&
                                <p className="finished-message">Улица успешно обновлена!</p>
                            }
                            {permissions?.map((permission) => (
                                <Form.Item label={permission.name} style={{
                                    margin: "0 auto",
                                    paddingBottom: "10px",
                                    paddingTop: "10px",
                                    borderBottom: "1px solid #d7d7d7"
                                }}>
                                    <Checkbox value={"READ " + permission.menu_item_id}
                                              defaultChecked={permission.read_permission} onChange={checkboxChanged}
                                              style={{lineHeight: '32px', paddingTop: "5px"}}>
                                        Читать
                                    </Checkbox>
                                    <Checkbox value={"WRITE " + permission.menu_item_id}
                                              defaultChecked={permission.write_permission} onChange={checkboxChanged}
                                              style={{lineHeight: '32px', paddingLeft: "435px"}}>
                                        Создавать
                                    </Checkbox>
                                    <Checkbox value={"EDIT " + permission.menu_item_id}
                                              defaultChecked={permission.edit_permission} onChange={checkboxChanged}
                                              style={{lineHeight: '32px', paddingLeft: "435px"}}>
                                        Изменять
                                    </Checkbox>
                                    <Checkbox value={"DELETE " + permission.menu_item_id}
                                              defaultChecked={permission.delete_permission} onChange={checkboxChanged}
                                              style={{lineHeight: '32px', paddingLeft: "435px"}}>
                                        Удалять
                                    </Checkbox>
                                </Form.Item>
                            ))}
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit" style={{marginTop: 50}}>Изменить
                                    пользователя</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </ConfigProvider>
            </div>
        </>
    )
}