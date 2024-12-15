import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteStatement, getStatements} from "../../../shared/api";
import {Button, Card, ConfigProvider, Input, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./StatementPage.scss"
import {useConfig} from "../../../app/context/ConfigProvider/context.ts";
import {SearchOutlined} from "@ant-design/icons";

export type Statement = {
    id?: number,
    number: string,
    receipt_date?: string,
    total_sum?: number,
    supplier_id?: number | null | undefined,
    supplier_name?: string | null | undefined,
}



export const StatementPage: FC = () => {
    const [dataSource, setDataSource] = useState<Statement[]>([]);
    const navigate = useNavigate();
    const config = useConfig()
    const permissions = config?.permissions?.filter((permission) => permission.function == '/statements') ?? [];
    const [numberFilter, setNumberFilter] = useState<string>('')
    const [supplierFilter, setSupplierFilter] = useState<string>('')


    const getStatementsForTable = useCallback(async () => {
        const statements = await getStatements();
        setDataSource(statements)
    },[])

    const handleSearch = useCallback(async (number: string, supplier: string) => {
        const statement: Statement = {number: number, supplier_name: supplier}
        const result = await getStatements(statement);
        setDataSource(result)
    },[])

    const handleDelete = useCallback(async (id: number) => {
        await deleteStatement(id)
        await getStatementsForTable();
    },[])

    useEffect(() => {
        handleSearch(numberFilter, supplierFilter)
    }, [handleSearch, numberFilter, numberFilter, supplierFilter]);

    useEffect(() => {
        getStatementsForTable()
    }, [getStatementsForTable]);

    return (
        <>
            <div className="statement-page">
                {permissions[0].read_permission ?
                    <ConfigProvider theme={{
                        components: {
                            Button: {
                                colorPrimary: "#04aa6d",
                                colorPrimaryHover: "#088557",
                                colorPrimaryActive: "#088557",
                            },
                        },
                    }}>
                        <Card title="Приходные накладные" className="card-container"
                              extra={
                                  <>
                                      {permissions[0].write_permission &&
                                          <Button type="primary" onClick={() => navigate(`create`)}
                                                  className="table-create-button">Добавить запись</Button>
                                      }
                                  </>
                              }
                        >
                            <Table dataSource={dataSource} bordered>
                                <Column title="ID" dataIndex="id" key="id" width="3%" />
                                <Column
                                    title="Номер"
                                    dataIndex="number"
                                    key='number'
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => setNumberFilter(e.target.value)}/>
                                    )}
                                />
                                <Column
                                    title="Дата поступления"
                                    dataIndex="receipt_date"
                                    key="receipt_date"
                                    render={date => date.split('T')[0]}
                                />
                                <Column
                                    title="Поставщик"
                                    dataIndex="supplier_name"
                                    key="supplier_name"
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => setSupplierFilter(e.target.value)}/>
                                    )}
                                />
                                <Column
                                    title="Сумма"
                                    dataIndex="total_sum"
                                    key="total_sum"
                                />
                                <Column
                                    title="Действия"
                                    key="action"
                                    width="15%"
                                    render={(_: any, record) => (
                                        <Space size={"middle"}>
                                            <Button variant="solid" color="default"
                                                    onClick={() => navigate(`view/${record.id}`)}>Подробнее</Button>
                                            {permissions[0].edit_permission &&
                                                <Button type="primary"
                                                        onClick={() => navigate(`edit/${record.id}`)}>Редактировать</Button>
                                            }
                                            {permissions[0].delete_permission &&
                                                <Button variant="solid" color="danger"
                                                        onClick={() => handleDelete(record.id)}>Удалить</Button>
                                            }
                                        </Space>
                                    )}
                                />
                            </Table>
                        </Card>
                    </ConfigProvider>
                    :
                    <p>У ВАС ОТСУТСТВУЕТ ДОСТУП, ОБРАТИТЕТСЬ К АДМИНИСТРАТОРУ, ДЛЯ ПОЛУЧЕНИЯ ДОСТУПА К ЭТОЙ СТРАНИЦЕ</p>
                }
            </div>
        </>
    )
}