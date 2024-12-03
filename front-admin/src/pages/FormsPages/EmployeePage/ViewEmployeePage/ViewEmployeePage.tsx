import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, ConfigProvider, Table} from "antd";
import Column from "antd/es/table/Column";
import "./VIewEmployeePage.scss"
import {Employee} from "../EmployeePage.tsx";
import {sendCustomRequest} from "../../../../shared/api";
import {Arrow} from "../../../../shared/components/SVG/Arrow/Arrow.tsx";


export const ViewEmployeePage: FC = () => {
    const [dataSource, setDataSource] = useState<Employee[]>([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const getEmployeesForTable = useCallback(async () => {
        const result = await sendCustomRequest(`
                    SELECT 
                        employee.id,
                        employee.surname,
                        post.name
                    FROM 
                        employee
                    JOIN 
                        post ON employee.post_id = post.id
                    WHERE 
                        employee.id = ${id};`)
        setDataSource(result?.dataSource)
    },[])


    useEffect(() => {
        getEmployeesForTable()
    }, [dataSource]);

    return (
        <>
            <div className="employee-page">
                <ConfigProvider theme={{
                    components:{
                        Button: {
                            colorPrimary: "#04aa6d",
                            colorPrimaryHover: "#088557",
                            colorPrimaryActive: "#088557",
                        },
                    },
                }}>
                    <Card title="Сотрудники" className="card-container" extra={<Button variant="text" onClick={() => navigate(-1)}><Arrow/>Назад</Button>}>
                        <Table dataSource={dataSource} bordered>
                            <Column title="ID" dataIndex="id" key="id"/>
                            <Column title="Фамилия" dataIndex="surname" key='surname'/>
                            <Column title="Должность" dataIndex="name" key="name"/>
                        </Table>
                    </Card>
                </ConfigProvider>
            </div>
        </>
    )
}