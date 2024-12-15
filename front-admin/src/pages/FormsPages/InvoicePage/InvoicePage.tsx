import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteInvoice, getInvoices} from "../../../shared/api";
import {Button, Card, ConfigProvider, Input, Modal, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./InvoicePage.scss"
import {useConfig} from "../../../app/context/ConfigProvider/context.ts";
import {SearchOutlined} from "@ant-design/icons";

export type Invoice = {
    id?: number,
    number: string,
    discharge_date?: string;
    employee_surname?: string | null | undefined;
    buyer_name?: string | null | undefined;
    employee_id?: number | null | undefined;
    buyer_id?: number | null | undefined;
    total_sum?: number;
}



export const InvoicePage: FC = () => {
    const [dataSource, setDataSource] = useState<Invoice[]>([]);
    const navigate = useNavigate();
    const config = useConfig()
    const permissions = config?.permissions?.filter((permission) => permission.function == '/invoices') ?? [];
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const [numberFilter, setNumberFilter] = useState<string>('')
    const [employeeFilter, setEmployeeFilter] = useState<string>('')
    const [buyerFilter, setBuyerFilter] = useState<string>('')

    const getInvoicesForTable = useCallback(async () => {
        const invoices = await getInvoices();
        setDataSource(invoices)
    },[])

    const handleSearch = useCallback(async (number: string, employee: string, buyer: string) => {
        const invoice: Invoice = {number: number, employee_surname: employee, buyer_name: buyer}
        const result = await getInvoices(invoice);
        setDataSource(result)
    },[])

    const handleDelete = useCallback( (id: number) => {
        setSelectedId(id);
        setIsOpen(true)
    },[])

    useEffect(() => {
        handleSearch(numberFilter, employeeFilter, buyerFilter)
    }, [handleSearch, numberFilter, employeeFilter, buyerFilter]);

    useEffect(() => {
        getInvoicesForTable()
    }, [getInvoicesForTable]);

    return (
        <>
            <div className="invoice-page">
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
                        <Card title="Счет-фактуры" className="card-container"
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
                                <Column title="ID" dataIndex="id" key="id" width="3%"/>
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
                                    title="Дата выписки"
                                    dataIndex="discharge_date"
                                    key="discharge_date" render={date => date.split('T')[0]}
                                />
                                <Column
                                    title="Сотрудник"
                                    dataIndex="employee_surname"
                                    key="employee_surname"
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => setEmployeeFilter(e.target.value)}/>
                                    )}
                                />
                                <Column
                                    title="Покупатель"
                                    dataIndex="buyer_name"
                                    key="buyer_name"
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => setBuyerFilter(e.target.value)}/>
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
                        <Modal open={isOpen}
                               onCancel={() => setIsOpen(false)}
                               title="Вы точно хотите удалить?"
                               cancelText="Нет"
                               okText="Удалить"
                               okType="danger"
                               onOk={async () => {
                                   setIsOpen(false);
                                   await deleteInvoice(selectedId)
                                   await getInvoicesForTable();
                               }}
                        >
                            <p>Вы не сможете вернуть удаленные данные!</p>
                        </Modal>
                    </ConfigProvider>
                    :
                    <p>У ВАС ОТСУТСТВУЕТ ДОСТУП, ОБРАТИТЕТСЬ К АДМИНИСТРАТОРУ, ДЛЯ ПОЛУЧЕНИЯ ДОСТУПА К ЭТОЙ СТРАНИЦЕ</p>
                }
            </div>
        </>
    )
}