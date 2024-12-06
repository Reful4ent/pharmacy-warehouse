import axios from "axios";
import {urlRoute} from "./route.ts";
import {Permission} from "./types.ts";
import {Street} from "../../pages/FormsPages/StreetPage/StreetPage.tsx";
import {Post} from "../../pages/FormsPages/PostPage/PostPage.tsx";
import {Bank} from "../../pages/FormsPages/BankPage/BankPage.tsx";
import {Country} from "../../pages/FormsPages/CountryPage/CountryPage.tsx";
import {Package} from "../../pages/FormsPages/PackagePage/PackagePage.tsx";
import {Category} from "../../pages/FormsPages/CategoryPage/CategoryPage.tsx";
import {Employee} from "../../pages/FormsPages/EmployeePage/EmployeePage.tsx";
import {Buyer} from "../../pages/FormsPages/BuyerPage/BuyerPage.tsx";
import {Supplier} from "../../pages/FormsPages/SupplierPage/SupplierPage.tsx";
import {Producer} from "../../pages/FormsPages/ProducerPage/ProducerPage.tsx";


export const getConfig = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/menuContexts',
        );

        return {
            header: response.data,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}



export const getUserPermissions = async (id: number): Promise<Permission[] | null> => {
    try {
        const response = await axios.post(
            urlRoute + '/permissions',
            {
                id: id,
            }
        )

        return  response.data
    } catch (error) {
        console.log(error);
        return null;
    }
}

export type TableColumns = {
    title: string;
    dataIndex: string;
    key: string;
    render: (value: any) => void;
}

export const sendCustomRequest = async (request: string) => {
    try {
        const response = await axios.post(
            urlRoute + '/customQuery',
            {
                query: request,
            }
        )

        let columns= [];
        for(let key of Object.keys(response.data[0])) {
            columns.push({
                title: key,
                dataIndex: key,
                key: key,
                render: (value: any) => String(value)
            });
        }
        console.log(response.data);
        return {
            dataSource: response.data,
            columns: columns,
            error: response.data.error
        };
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            columns: [],
            error: error.response.data.error
        };
    }
}

export const getStreets = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/streets',
        )
        return response.data
    } catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const getStreet = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/streets/' + id,
        )
        return response.data
    } catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deleteStreet = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/streets/' + id,
        ).finally()
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const createStreet = async (name: string) => {
    try {
        await axios.post(
            urlRoute + '/streets/create',
            {
                name: name
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}




export const updateStreet = async (street: Street) => {
    try {
        await axios.put(
            urlRoute + '/streets/' + street.id,
            {
                name: street.name,
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const getPosts = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/posts',
        )
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deletePost = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/posts/' + id,
        ).finally()
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const createPost = async (name: string) => {
    try {
        await axios.post(
            urlRoute + '/posts/create',
            {
                name: name
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const updatePost = async (post: Post) => {
    try {
        await axios.put(
            urlRoute + '/posts/' + post.id,
            {
                name: post.name,
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const getPost = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/posts/' + id,
        )
        return response.data
    } catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}



export const getBanks = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/banks',
        )
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deleteBank = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/banks/' + id,
        ).finally()
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const createBank = async (name: string) => {
    try {
        await axios.post(
            urlRoute + '/banks/create',
            {
                name: name
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const updateBank = async (bank: Bank) => {
    try {
        await axios.put(
            urlRoute + '/banks/' + bank.id,
            {
                name: bank.name,
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const getBank = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/banks/' + id,
        )
        return response.data
    } catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}



export const getCountries = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/countries',
        )
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const deleteCountry = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/countries/' + id,
        ).finally()
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const createCountry = async (name: string) => {
    try {
        await axios.post(
            urlRoute + '/countries/create',
            {
                name: name
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const updateCountry = async (country: Country) => {
    try {
        await axios.put(
            urlRoute + '/countries/' + country.id,
            {
                name: country.name,
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const getCountry = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/countries/' + id,
        )
        return response.data
    } catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const getCategories = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/categories',
        )
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deleteCategory = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/categories/' + id,
        ).finally()
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const createCategory = async (name: string) => {
    try {
        await axios.post(
            urlRoute + '/categories/create',
            {
                name: name
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const updateCategory = async (category: Category) => {
    try {
        await axios.put(
            urlRoute + '/categories/' + category.id,
            {
                name: category.name,
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const getCategory = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/categories/' + id,
        )
        return response.data
    } catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const getPackages = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/packages',
        )
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deletePackage = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/packages/' + id,
        ).finally()
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const createPackage = async (name: string) => {
    try {
        await axios.post(
            urlRoute + '/packages/create',
            {
                name: name
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const updatePackage = async (_package: Package) => {
    try {
        await axios.put(
            urlRoute + '/packages/' + _package.id,
            {
                name: _package.name,
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const getPackage = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/packages/' + id,
        )
        return response.data
    } catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const getMedicines = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/medicines',
        )
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deleteMedicine = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/medicines/' + id,
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const getEmployees = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/employees',
        )
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deleteEmployee = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/employees/' + id,
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const createEmployee = async (employee: Employee) => {
    try {
        console.log(employee);
        await axios.post(
            urlRoute + '/employees/create',
            {
                surname: employee.surname,
                post_id: employee.post_id,
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const getEmployee = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/employees/' + id,
        )
        return response.data
    } catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const updateEmployee = async (employee: Employee) => {
    try {
        await axios.put(
            urlRoute + '/employees/' + employee.id,
            {
                surname: employee.surname,
                post_id: employee.post_id,
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}



export const getBuyers = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/buyers',
        )
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deleteBuyer = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/buyers/' + id,
        ).finally()
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const createBuyer = async (buyer: Buyer) => {
    try {
        await axios.post(
            urlRoute + '/buyers/create',
            {
                name: buyer.name,
                bank_id: buyer.bank_id,
                street_id: buyer.street_id,
                phone_number: buyer.phone_number,
                tin: buyer.tin,
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const getBuyer = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/buyers/' + id,
        )
        return response.data
    } catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const updateBuyer = async (buyer: Buyer) => {
    try {
        await axios.put(
            urlRoute + '/buyers/' + buyer.id,
            {
                name: buyer.name,
                bank_id: buyer.bank_id,
                street_id: buyer.street_id,
                phone_number: buyer.phone_number,
                tin: buyer.tin,
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const getProducers = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/producers',
        )
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deleteProducer = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/producers/' + id,
        ).finally()
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const updateProducer = async (producer: Producer) => {
    try {
        await axios.put(
            urlRoute + '/producers/' + producer.id,
            {
                name: producer.name,
                country_id: producer.country_id,
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const getProducer = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/producers/' + id,
        )
        return response.data
    } catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const createProducer = async (producer: Producer) => {
    try {
        await axios.post(
            urlRoute + '/producers/create',
            {
                name: producer.name,
                country_id: producer.country_id,
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const getSuppliers = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/suppliers',
        )
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deleteSupplier = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/suppliers/' + id,
        ).finally()
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const createSupplier = async (supplier: Supplier) => {
    try {
        await axios.post(
            urlRoute + '/suppliers/create',
            {
                name: supplier.name,
                bank_id: supplier.bank_id,
                street_id: supplier.street_id,
                phone_number: supplier.phone_number,
                tin: supplier.tin,
                current_account: supplier.current_account
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const updateSupplier = async (supplier: Supplier) => {
    try {
        await axios.put(
            urlRoute + '/suppliers/' + supplier.id,
            {
                name: supplier.name,
                bank_id: supplier.bank_id,
                street_id: supplier.street_id,
                phone_number: supplier.phone_number,
                tin: supplier.tin,
                current_account:supplier.current_account
            }
        )
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const getSupplier = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/suppliers/' + id,
        )
        return response.data
    } catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const getInvoices = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/invoices',
        )
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deleteInvoice = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/invoices/' + id,
        ).finally()
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const getStatements = async () => {
    try {
        const response = await axios.get(
            urlRoute + '/statements',
        )
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deleteStatement = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/statements/' + id,
        ).finally()
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}