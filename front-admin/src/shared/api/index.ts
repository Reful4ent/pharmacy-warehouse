import axios from "axios";
import {urlRoute} from "./route.ts";


export const getConfig = async () => {
    try {
        const response = await axios.get(
            urlRoute +
            '/menuContexts',
        );

        return {
            header: response.data,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}