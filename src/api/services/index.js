import axios from 'axios';
import {DB_URL} from '../../other/constants';

export function fetchProducts() {
    return axios.get(DB_URL);
}
