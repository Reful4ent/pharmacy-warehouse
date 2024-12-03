import {FC, useCallback, useEffect, useState} from "react";
import {Button, Card, ConfigProvider, Form, Input} from "antd";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {getPackage, updatePackage} from "../../../../shared/api";
import {Package} from "../PackagePage.tsx";
import "./EditPackagePage.scss"


export const EditPackagePage: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isConfirm, setIsConfirm] = useState<boolean>(false);



    const handleUpdate = useCallback(async () => {
        setIsConfirm(false)
        const _package: Package = {
            id: Number(id),
            name: form.getFieldValue('name')
        }
        const result = await updatePackage(_package)
        if(result) {
            setIsConfirm(true)
        }
    },[])

    const getData = useCallback(async () => {
        const result = await getPackage(Number(id));
        form.setFieldsValue(result)
    },[])

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className="edit-package-page">
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
                    <Card title="Изменить упаковку"
                          extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Form form={form} layout="vertical" onFinish={handleUpdate} className="form-container">
                            <Form.Item name="name" label="Название упаковки" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            {isConfirm &&
                                <p className="finished-message">Упаковка успешно обновлена!</p>
                            }
                            <Form.Item className="submit-create-button">
                                <Button type="primary" htmlType="submit">Изменить упаковку</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </ConfigProvider>
            </div>
        </>
    )
}