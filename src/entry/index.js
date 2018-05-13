import './index.css';

import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from '@/routes';
import store from '@/store';

render(
    (
        <Provider store={store}>
            <Router history={hashHistory} routes={routes}/>
        </Provider>
    ),
    document.getElementById('root')
);
