import { RECEIVE_ISSUES, REQUEST_ISSUES } from '../actionTypes/issue';

const defaultState = {
    loading: 1,
    items: []
};

function issue(state = defaultState, action) {
    switch (action.type) {
        case REQUEST_ISSUES:
            return {
                ...state,
                loading: 1
            };
        case RECEIVE_ISSUES:
            return {
                ...state,
                loading: 0,
                items: action.items
            };
        default:
            return state;
    }
}

export default issue;