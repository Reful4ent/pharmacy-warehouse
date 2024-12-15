import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteSupplier, getSuppliers} from "../../../shared/api";
import {Button, Card, ConfigProvider, Input, Modal, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import "./SupplierPage.scss"
import {useConfig} from "../../../app/context/ConfigProvider/context.ts";
import {SearchOutlined} from "@ant-design/icons";

export type Supplier = {
    id?: number;
    name: string;
    bank_id?: number;
    bank_name?: string;
    street_id?: number;
    street_name?: string;
    phone_number: string;
    tin: string;
    current_account: string;
}



export const SupplierPage: FC = () => {
    const config = useConfig()
    const [dataSource, setDataSource] = useState<Supplier[]>([]);
    const navigate = useNavigate();
    const permissions = config?.permissions?.filter((permission) => permission.function == '/suppliers') ?? [];
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const [nameFilter, setNameFilter] = useState<string>('')
    const [bankFilter, setBankFilter] = useState<string>('')
    const [streetFilter, setStreetFilter] = useState<string>('')
    const [phoneNumberFilter, setPhoneNumberFilter] = useState<string>('')
    const [currentAccountFilter, setCurrentAccountFilter] = useState<string>('')
    const [tinFilter, setTinFilter] = useState<string>('')

    const getSuppliersForTable = useCallback(async () => {
        const result = await getSuppliers();
        setDataSource(result)
    },[])

    const handleSearch = useCallback(async (name: string, bank: string, street: string, phoneNumber: string, currentAccount: string, tin: string) => {
        const supplier: Supplier = {name: name, bank_name: bank, street_name: street, phone_number: phoneNumber, current_account: currentAccount, tin: tin}
        const result = await getSuppliers(supplier);
        setDataSource(result)
    },[])

    const handleDelete = useCallback( (id: number) => {
        setSelectedId(id);
        setIsOpen(true)
    },[])

    useEffect(() => {
        handleSearch(nameFilter, bankFilter, streetFilter, phoneNumberFilter, currentAccountFilter, tinFilter)
    }, [handleSearch, nameFilter, bankFilter, streetFilter, phoneNumberFilter, currentAccountFilter, tinFilter]);


    useEffect(() => {
        getSuppliersForTable()
    }, [getSuppliersForTable]);

    return (
        <>
            <div className="supplier-page">
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
                        <Card title="Поставщики" className="card-container"
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
                                    title="Название"
                                    dataIndex="name"
                                    key='name'
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => setNameFilter(e.target.value)}/>
                                    )}
                                />
                                <Column
                                    title="Банк"
                                    dataIndex="bank_name"
                                    key="bank_name"
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => setBankFilter(e.target.value)}/>
                                    )}
                                />
                                <Column
                                    title="Улицы"
                                    dataIndex="street_name"
                                    key="street_name"
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => setStreetFilter(e.target.value)}/>
                                    )}
                                />
                                <Column
                                    title="Номер телефона"
                                    dataIndex="phone_number"
                                    key="phone_number"
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => setPhoneNumberFilter(e.target.value)}/>
                                    )}
                                />
                                <Column
                                    title="Расчетный счет"
                                    dataIndex="current_account"
                                    key="current_account"
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => setCurrentAccountFilter(e.target.value)}/>
                                    )}
                                />
                                <Column
                                    title="ИНН"
                                    dataIndex="tin"
                                    key="tin"
                                    filterIcon={(filtered) => <SearchOutlined style={{ color: filtered ? '#1668dc' : undefined }} />}
                                    filterDropdown={() => (
                                        <Input.Search onChange={(e) => setTinFilter(e.target.value)}/>
                                    )}
                                />
                                {(permissions[0].delete_permission || permissions[0].edit_permission) &&
                                    <Column
                                        title="Действия"
                                        key="action"
                                        width="10%"
                                        render={(_: any, record) => (
                                            <Space size={"middle"}>
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
                                    />}
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
                                   await deleteSupplier(selectedId)
                                   await getSuppliersForTable();
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