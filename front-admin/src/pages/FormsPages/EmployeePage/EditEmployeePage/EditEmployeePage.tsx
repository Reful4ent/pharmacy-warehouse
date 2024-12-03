import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Form, Input, Select} from "antd";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {getEmployee, getPosts, updateEmployee} from "../../../../shared/api";
import "./EditEmployeePage.scss"
import {Post} from "../../PostPage/PostPage.tsx";



export const EditEmployeePage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [postsOptions, setPostsOptions] = useState()


    const handleUpdate = useCallback(async () => {
        setIsConfirm(false)
        const surname = form.getFieldValue('surname')
        const post = form.getFieldValue('post_id')
        const result = await updateEmployee({
            id: Number(id),
            surname: surname,
            post_id: post
        })
        if(result) {
            setIsConfirm(true)
        }
    },[])


    const getData = useCallback(async () => {
        const posts = await getPosts();
        const employee = await getEmployee(Number(id))
        const finallyPosts = posts.map((post: Post) => ({label: post.name, value:post.id}))
        setPostsOptions(finallyPosts)
        form.setFieldsValue(employee);
    },[])

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className="edit-employee-page">
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
                    <Card title="Изменить сотрудника"
                          extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleUpdate} className="form-container">
                            <Form.Item name="surname" label="Фамилия сотрудника" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Должность" name='post_id' rules={[{required: true}]}>
                                <Select
                                    showSearch
                                    options={postsOptions}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            {isConfirm &&
                                <p className="finished-message">Сотрудник успешно обновлен!</p>
                            }
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Изменить сотрудника</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </ConfigProvider>
            </div>
        </>
    )
}