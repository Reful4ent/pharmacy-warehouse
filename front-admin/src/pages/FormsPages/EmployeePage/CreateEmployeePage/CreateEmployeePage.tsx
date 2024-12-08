import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Form, Input, Modal, Select} from "antd";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate} from "react-router-dom";
import {createEmployee, getPosts} from "../../../../shared/api";
import "./CreateEmployeePage.scss"
import {Post} from "../../PostPage/PostPage.tsx";



export const CreateEmployeePage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [postsOptions, setPostsOptions] = useState()
    const [isOpen, setIsOpen] = useState<boolean>(false)


    const handleCreate = useCallback(async () => {
        const surname = form.getFieldValue('surname')
        const post = form.getFieldValue('post_id')
        const result = await createEmployee({
            surname: surname,
            post_id: post
        })
        if(result){
            navigate('/employees')
        }
    },[])

    const handleSubmit = useCallback(() => {
        setIsOpen(true)
    },[])

    const getPostsForForm = useCallback(async () => {
        const posts = await getPosts();
        const finallyPosts = posts.map((post: Post) => ({label: post.name, value:post.id}))
        setPostsOptions(finallyPosts)
    },[])

    useEffect(() => {
        getPostsForForm()
    }, []);

    return (
        <>
            <div className="create-employee-page">
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
                    <Card title="Создать сотрудника"
                          extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleSubmit} className="form-container">
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