import { LOADING, LOADED } from '../actionTypes/loading';

const defaultState = true;

function loading(state = defaultState, action) {
    switch (action.type) {
        case LOADING:
            return true;
        case LOADED:
            return false;
        default:
            return state;
    }
}

export default loading;