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
import {User} from "../../app/context/AuthProvider/types.ts";
import {Medicine} from "../../pages/FormsPages/MedicinePage/MedicinePage.tsx";
import {Invoice} from "../../pages/FormsPages/InvoicePage/InvoicePage.tsx";
import {Statement} from "../../pages/FormsPages/StatementPage/StatementPage.tsx";


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

export const getUsers = async (user?: User) => {
    try {
        let response
        if (user) {
            response = await axios.post(
                urlRoute + '/users',
                {
                    id: user.id,
                }
            )
        }
        else {
            response = await axios.post(
                urlRoute + '/users',
            )
        }
        return response.data
    } catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const deleteUsers = async (id: number) => {
    try {
        await axios.delete(
            urlRoute + '/users/' + id,
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

export const createUser = async (user: User) => {
    try {
        await axios.post(
            urlRoute + '/users/register',
            {
                login: user.login,
                password: user.password,
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

export const updateUser = async (user: User) => {
    try {
        console.log(user)
        await axios.put(
            urlRoute + '/users/change-password',
            {
                id: user.id,
                login: user.login,
                password: user.password,
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

export const updateUserPermissions = async (permission: Permission): Promise<Permission[] | null> => {
    try {
        const response = await axios.put(
            urlRoute + '/permissions',
            {
                id: permission.id,
                user_id: permission.user_id,
                menu_item_id: permission.menu_item_id,
                read_permission: permission.read_permission,
                write_permission: permission.write_permission,
                edit_permission: permission.edit_permission,
                delete_permission: permission.delete_permission,
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

export const getStreets = async (street?: string | null) => {
    try {
        const response = await axios.post(
            urlRoute + '/streets',
            {
                name: street,
            }
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


export const getPosts = async (post?: string | null) => {
    try {
        const response = await axios.post(
            urlRoute + '/posts',
            {
                name: post
            }
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



export const getBanks = async (bank?: string | null) => {
    try {
        const response = await axios.post(
            urlRoute + '/banks',
            {
                name: bank
            }
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



export const getCountries = async (country?: string | null) => {
    try {
        const response = await axios.post(
            urlRoute + '/countries',
            {
                name: country
            }
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

export const getCategories = async (category?: string | null) => {
    try {
        const response = await axios.post(
            urlRoute + '/categories',
            {
                name: category
            }
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


export const getPackages = async (package_?:string | null) => {
    try {
        const response = await axios.post(
            urlRoute + '/packages',
            {
                name: package_
            }
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


export const getMedicines = async (medicine?: Medicine) => {
    try {
        const response = await axios.post(
            urlRoute + '/medicines',
            {
                name: medicine?.name,
                registration_num: medicine?.registration_num,
            }
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

export const getMedicine = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/medicines/' + id,
        )
        let medicine = response.data
        const categories = await sendCustomRequest(`SELECT category_id FROM medicine_category where medicine_id=${id}`);
        const package_ = await sendCustomRequest(`SELECT package_id FROM medicine_package WHERE medicine_id=${id}`);
        const producer = await sendCustomRequest(`SELECT producer_id FROM medicine_producer WHERE medicine_id=${id}`);
        medicine['category_names'] = categories.dataSource.map((element: any) => element.category_id)
        medicine['package_name'] = package_.dataSource.map((element: any) => element.package_id)
        medicine['producer_name'] = producer.dataSource.map((element: any) => element.producer_id)
        return response.data
    } catch (error: any) {
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

export const createMedicine = async (medicine: Medicine) => {
    try {
        const result = await axios.post(
            urlRoute + '/medicines/create',
            {
                name: medicine.name,
                production_date: medicine.production_date,
                expiration_date: medicine.expiration_date,
                registration_num: medicine.registration_num,
                price: medicine.price,
            }
        )

        const id = result.data.id;

        for (const packages_id of medicine?.package_name) {
            try {
                await sendCustomRequest(`INSERT INTO medicine_package (medicine_id, package_id) VALUES (${id},${packages_id})`);
            } catch (error) {
                console.error('Error inserting into medicine_package:', error);
            }
        }

        for(const producers_id of medicine?.producer_name) {
            try {
                await sendCustomRequest(`INSERT INTO medicine_producer (medicine_id, producer_id) VALUES (${id},${producers_id})`);
            } catch (error) {
                console.error('Error inserting into medicine_producer:', error);
            }
        }


        for (const category_id of medicine?.category_names) {
            try {
                await sendCustomRequest(`INSERT INTO medicine_category (medicine_id, category_id) VALUES (${id},${category_id})`);
            } catch (error) {
                console.error(`Error inserting into medicine_category for category ${category_id}:`, error);
            }
        }

        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const updateMedicine = async (medicine: Medicine) => {
    try {
        await axios.put(
            urlRoute + '/medicines/' + medicine.id,
            {
                name: medicine.name,
                production_date: medicine.production_date,
                expiration_date: medicine.expiration_date,
                registration_num: medicine.registration_num,
                price: medicine.price,
            }
        )

        try{
            await sendCustomRequest(`DELETE FROM medicine_package WHERE medicine_id=${medicine.id}`);
        } catch (error) {
            console.error(error);
        }

        try{
            await sendCustomRequest(`DELETE FROM medicine_category WHERE medicine_id=${medicine.id}`);
        } catch (error) {
            console.error(error);
        }

        try{
            await sendCustomRequest(`DELETE FROM medicine_producer WHERE medicine_id=${medicine.id}`);
        } catch (error) {
            console.error(error);
        }


        for (const packages_id of medicine?.package_name) {
            try {
                await sendCustomRequest(`INSERT INTO medicine_package (medicine_id, package_id) VALUES (${medicine.id},${packages_id})`);
            } catch (error) {
                console.error('Error inserting into medicine_package:', error);
            }
        }

        for(const producers_id of medicine?.producer_name) {
            try {
                await sendCustomRequest(`INSERT INTO medicine_producer (medicine_id, producer_id) VALUES (${medicine.id},${producers_id})`);
            } catch (error) {
                console.error('Error inserting into medicine_producer:', error);
            }
        }


        for (const category_id of medicine?.category_names) {
            try {
                await sendCustomRequest(`INSERT INTO medicine_category (medicine_id, category_id) VALUES (${medicine.id},${category_id})`);
            } catch (error) {
                console.error(`Error inserting into medicine_category for category ${category_id}:`, error);
            }
        }

        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const getEmployees = async (employee?: Employee | null) => {
    try {
        const response = await axios.post(
            urlRoute + '/employees',{
                surname: employee?.surname,
                post_name: employee?.post_name
            }
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



export const getBuyers = async (buyer?: Buyer) => {
    try {
        const response = await axios.post(
            urlRoute + '/buyers',
            {
                name: buyer?.name,
                bank_name: buyer?.bank_name,
                street_name: buyer?.street_name,
                phone_number: buyer?.phone_number,
                tin: buyer?.tin,
            }
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


export const getProducers = async (producer?: Producer) => {
    try {
        const response = await axios.post(
            urlRoute + '/producers',
            {
                name: producer?.name,
                country_name: producer?.country_name
            }
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


export const getSuppliers = async (supplier?: Supplier) => {
    try {
        const response = await axios.post(
            urlRoute + '/suppliers',
            {
                name: supplier?.name,
                bank_name: supplier?.bank_name,
                street_name: supplier?.street_name,
                phone_number: supplier?.phone_number,
                current_account: supplier?.current_account,
                tin: supplier?.tin,
            }
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


export const getInvoices = async (invoice?: Invoice) => {
    try {
        const response = await axios.post(
            urlRoute + '/invoices',
            {
                number_of_invoice: invoice?.number,
                employee_surname: invoice?.employee_surname,
                buyer_name: invoice?.buyer_name
            }
        )
        console.log(response.data)
        return response.data
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const getInvoice = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/invoices/' + id,
        )
        console.log(response.data)
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

export type MedicineToInvoice = {
    medicine_id: number,
    price_that_time: number,
    quantity: number,
}

export const createInvoice = async (invoice: Invoice, medicines: MedicineToInvoice[]) => {
    try {
        const result = await axios.post(
            urlRoute + '/invoices/create',
            {
                number_of_invoice: invoice.number,
                discharge_date: invoice.discharge_date,
                employee_id: invoice.employee_id,
                buyer_id: invoice.buyer_id,
                total_sum: invoice.total_sum,
            }
        )

        const id = result.data.id;

        for (const medicine of medicines) {
            try {
                await sendCustomRequest(`INSERT INTO
                                                    invoice_medicine (invoice_id, medicine_id, price_that_time, quantity)
                                                 VALUES (${id}, ${medicine.medicine_id}, ${medicine.price_that_time}, ${medicine.quantity})`);
            } catch (error) {
                console.error('Error inserting into medicine_package:', error);
            }
        }

        console.log(result.data.id);
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const updateInvoice = async (invoice: Invoice, medicines: MedicineToInvoice[]) => {
    try {

        console.log(invoice)
        const result = await axios.put(
            urlRoute + '/invoices/' + invoice.id,
            {
                number_of_invoice: invoice.number,
                discharge_date: invoice.discharge_date,
                employee_id: invoice.employee_id,
                buyer_id: invoice.buyer_id,
                total_sum: invoice.total_sum,
            }
        )

        try{
            await sendCustomRequest(`DELETE FROM invoice_medicine WHERE invoice_id=${invoice.id}`);
        } catch (error) {
            console.error(error);
        }

        for (const medicine of medicines) {
            try {
                await sendCustomRequest(`INSERT INTO
                                                    invoice_medicine (invoice_id, medicine_id, price_that_time, quantity)
                                                 VALUES (${invoice.id}, ${medicine.medicine_id}, ${medicine.price_that_time}, ${medicine.quantity})`);
            } catch (error) {
                console.error('Error inserting into medicine_package:', error);
            }
        }

        console.log(result.data.id);
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

export const getStatements = async (statement?: Statement) => {
    try {
        const response = await axios.post(
            urlRoute + '/statements',
            {
                number_of_statement: statement?.number,
                supplier_name: statement?.supplier_name,
            }
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


export const getStatement = async (id: number) => {
    try {
        const response = await axios.get(
            urlRoute + '/statements/' + id,
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


export const createStatement = async (statement: Statement, medicines: MedicineToInvoice[]) => {
    try {
        const result = await axios.post(
            urlRoute + '/statements/create',
            {
                number_of_statement: statement.number,
                receipt_date: statement.receipt_date,
                supplier_id: statement.supplier_id,
                total_sum: statement.total_sum,
            }
        )

        const id = result.data.id;

        for (const medicine of medicines) {
            try {
                await sendCustomRequest(`INSERT INTO
                                                    statements_medicine (statements_id, medicine_id, price_that_time, quantity)
                                                 VALUES (${id}, ${medicine.medicine_id}, ${medicine.price_that_time}, ${medicine.quantity})`);
            } catch (error) {
                console.error('Error inserting into medicine_package:', error);
            }
        }
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const updateStatement = async (statement: Statement, medicines: MedicineToInvoice[]) => {
    try {
        const result = await axios.put(
            urlRoute + '/statements/' + statement.id,
            {
                number_of_statement: statement.number,
                receipt_date: statement.receipt_date,
                supplier_id: statement.supplier_id,
                total_sum: statement.total_sum,
            }
        )

        try{
            await sendCustomRequest(`DELETE FROM statements_medicine WHERE statements_id=${statement.id}`);
        } catch (error) {
            console.error(error);
        }

        for (const medicine of medicines) {
            try {
                await sendCustomRequest(`INSERT INTO
                                                    statements_medicine (statements_id, medicine_id, price_that_time, quantity)
                                                 VALUES (${statement.id}, ${medicine.medicine_id}, ${medicine.price_that_time}, ${medicine.quantity})`);
            } catch (error) {
                console.error('Error inserting into medicine_package:', error);
            }
        }

        console.log(result.data.id);
        return true;
    } catch (error: any) {
        console.log(error.response.data.error);
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const getInvoiceMedicine = async (id: number) => {
    try {
        const result = await axios.get(
            urlRoute + '/invoiceMedicines/' + id,

        )
        return result.data;
    }  catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}


export const getStatementMedicine = async (id: number) => {
    try {
        const result = await axios.get(
            urlRoute + '/statementMedicines/' + id,

        )
        return result.data;
    }  catch (error: any) {
        return {
            dataSource:[],
            error: error.response.data.error
        };
    }
}

