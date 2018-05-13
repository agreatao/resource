import { CONFIG } from '@/constants/config';
import api from '@/utils/api';

const BASE_URL = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}`;

let github = new api({
    baseURL: BASE_URL,
    params: {
        creator: CONFIG.owner
    }
});

export function get(url, params) {
    return github.get(url, params).then(response => response.json());
}