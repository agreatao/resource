import { LOADING, LOADED } from '../actionTypes/loading';

import { CONFIG } from '@/constants/config';

export const loading = () => {
    document.title = CONFIG.titleLoad;
    return {
        type: LOADING
    };
};

export const loaded = () => {
    document.title = CONFIG.title;
    return {
        type: LOADED
    };
};