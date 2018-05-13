import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from '@/pages/App';

import store from '@/store';
import { loading, loaded } from '@/store/actions/loading';

setTimeout(() => {
    var iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.onload = () => {
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 0);
    };
    document.body.appendChild(iframe);
}, 0);

const { dispatch } = store;

let Home = (location, cb) => {
    dispatch(loading());
    require.ensure([], require => {
        cb(null, require('@/pages/Home').default);
        dispatch(loaded());
    }, 'archives');
};

let Issues = (location, cb) => {
    dispatch(loading());
    require.ensure([], require => {
        cb(null, require('@/pages/Issues').default);
        dispatch(loaded());
    }, 'archives');
};

let Issue = (location, cb) => {
    dispatch(loading());
    require.ensure([], require => {
        cb(null, require('@/pages/Issue').default);
        dispatch(loaded());
    }, 'archive');
};

let About = (location, cb) => {
    dispatch(loading());
    require.ensure([], require => {
        cb(null, require('@/pages/About').default);
        dispatch(loaded());
    }, 'about');
};

export function createRoutes() {
    return (
        <Route path="/" components={App}>
            <IndexRedirect to="/home" />
            <Route path="/home" getComponent={Home} />
            <Route path="/issues" getComponent={Issues} />
            <Route path="/issue/:index" getComponent={Issue} />
            <Route path="/about" getComponent={About} />
        </Route>
    );
}

export default createRoutes();