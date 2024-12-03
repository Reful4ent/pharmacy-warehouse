import {FC, useCallback} from "react";
import {Button, Card, ConfigProvider, Form, Input} from "antd";
import {createPackage} from "../../../../shared/api";
import {useNavigate} from "react-router-dom";
import './CreatePackagePage.scss'
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";

export const CreatePackagePage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()


    const handleCreate = useCallback(async () => {
        const result = await createPackage(form.getFieldValue('name'));
        if(result) {
            navigate('/packages')
        }
    },[])

    return (
        <>
            <div className="create-package-page">
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
                    <Card title="Создать упаковку" extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleCreate} className="form-container">
                            <Form.Item name="name" label="Название упаковки" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit" >Создать упаковку</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </ConfigProvider>
            </div>
        </>
    )
}