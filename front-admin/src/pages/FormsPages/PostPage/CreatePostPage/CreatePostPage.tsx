import {FC, useCallback, useState} from "react";
import {Button, Card, ConfigProvider, Form, Input, Modal} from "antd";
import {createPost} from "../../../../shared/api";
import {useNavigate} from "react-router-dom";
import './CreatePostPage.scss'
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";

export const CreatePostPage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(false)


    const handleCreate = useCallback(async () => {
        const result = await createPost(form.getFieldValue('name'));
        if(result) {
            navigate('/posts')
        }
    },[])

    const handleSubmit = useCallback(() => {
        setIsOpen(true)
    },[])


    return (
        <>
            <div className="create-post-page">
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
                    <Card title="Создать должность" extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleSubmit} className="form-container">
                            <Form.Item name="name" label="Название должности" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit" >Создать должность</Button>
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