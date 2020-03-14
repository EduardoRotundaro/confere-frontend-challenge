import axios from 'axios';
import {DB_URL} from '../../other/constants';

export function fetchProducts() {
    return axios.get(DB_URL);
}

export function getProductById(id) {
    // simulates a product fetch in API
    return new Promise(async (resolve, reject) => {
        try {
            const products = await fetchProducts();
            const response = products.data.products.filter((product) => product.code_color===id)[0];
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}
