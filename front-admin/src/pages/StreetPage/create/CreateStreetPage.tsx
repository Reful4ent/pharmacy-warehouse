import {FC, useCallback} from "react";
import {Button, Card, Form, Input} from "antd";


export const CreateStreetPage: FC = () => {
    const [form] = Form.useForm();

    const handleCreate = useCallback(async () => {

    },[])

    return (
        <>
            <Card title="Создать улицу">
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    <Form.Item name="name" label="Название улицы" rules={[{required: true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Создать улицу</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}