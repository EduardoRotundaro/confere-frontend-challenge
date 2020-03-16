import axios from 'axios';
import {DB_URL, PRODUCTS_FILTER} from '../../other/constants';

function sortByAvailability(a, b) {
    if(a.on_sale && !b.on_sale) return 1;
    if(!a.on_sale && b.on_sale) return -1;
    return 0;
}

export function fetchProducts(category) {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await axios.get(DB_URL);
            let response = products.data.products;
            if(category==='clothes') response = products.data.products.filter((p) => !PRODUCTS_FILTER.ACCESSORIES.includes(p.code_color));
            else if (category==='accessories') response = products.data.products.filter((p) => PRODUCTS_FILTER.ACCESSORIES.includes(p.code_color));
            resolve(response.sort(sortByAvailability));
        } catch (error) {
            reject(error);
        }        
    });
}

export function getProductById(id) {
    // simulates a product fetch in API
    return new Promise(async (resolve, reject) => {
        try {
            const products = await fetchProducts();
            const response = products.filter((product) => product.code_color===id)[0];
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}
