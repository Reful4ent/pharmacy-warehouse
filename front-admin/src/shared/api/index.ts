import axios from "axios";
import {urlRoute} from "./route.ts";
import {Permission} from "./types.ts";


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