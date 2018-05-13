import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer  } from 'react-router-redux';

import reducers from '@/store/reducers';

export function createCustomStore(preloadedState = {}) {
    return createStore(
        combineReducers({
            routing: routerReducer,
            ...reducers
        })
        , preloadedState
        , applyMiddleware(thunk)
    );
}

export default createCustomStore();