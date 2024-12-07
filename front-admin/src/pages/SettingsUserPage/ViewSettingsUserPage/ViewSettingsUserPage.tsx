import {FC, useCallback, useEffect, useState} from "react";
import {Permission} from "../../../shared/api/types.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Checkbox, Form, Input} from "antd";
import {Arrow} from "../../../shared/components/SVG/Arrow/Arrow.tsx";
import {getUserPermissions, getUsers} from "../../../shared/api";
import './ViewSettingsUserPage.scss'
import {User} from "../../../app/context/AuthProvider/types.ts";

export const ViewSettingsUserPage: FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const {id} = useParams();
    const [permissions, setPermissions] = useState<Permission[] | null>([])
    const [user, setUser] = useState<User | null>()

    const getData = useCallback(async () => {
        const result = await getUsers({id: Number(id), login: null, password: null});
        const permissions = await getUserPermissions(Number(id))
        setPermissions(permissions)
        setUser(result[0])
        form.setFieldsValue({login: result[0].login})
    }, [])

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className="view-settings-page">
                <Card title={"Пользователь " + user?.login} extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                    <Form form={form} layout="vertical" className="form-container">
                        <Form.Item name="login" label="Логин">
                            <Input readOnly/>
                        </Form.Item>
                        {permissions?.map((permission) => (
                            <Form.Item label={<h3>{permission.name}</h3>} style={{
                                margin: "0 auto",
                                paddingBottom: "10px",
                                paddingTop: "10px",
                                borderBottom: "1px solid #d7d7d7"
                            }}>
                                <Checkbox value={"READ " + permission.menu_item_id}
                                          checked={permission.read_permission}
                                          style={{lineHeight: '32px', paddingTop: "5px"}}>
                                    Читать
                                </Checkbox>
                                <Checkbox value={"WRITE " + permission.menu_item_id}
                                          checked={permission.write_permission}
                                          style={{lineHeight: '32px', paddingLeft: "435px"}}>
                                    Создавать
                                </Checkbox>
                                <Checkbox value={"EDIT " + permission.menu_item_id}
                                          checked={permission.edit_permission}
                                          style={{lineHeight: '32px', paddingLeft: "435px"}}>
                                    Изменять
                                </Checkbox>
                                <Checkbox value={"DELETE " + permission.menu_item_id}
                                          checked={permission.delete_permission}
                                          style={{lineHeight: '32px', paddingLeft: "435px"}}>
                                    Удалять
                                </Checkbox>
                            </Form.Item>
                        ))}
                    </Form>
                </Card>
            </div>
        </>
    )
}