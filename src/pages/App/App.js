import style from './App.scss';

import React from 'react';
import { connect } from 'react-redux';

import Loading from '@/components/Loading';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    render() {
        if(this.props.loading) {
            return (<Loading />);
        }
        return (
            <div className={style.app}>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loading } = Object.assign({}, {
        loading: true
    }, state);
    return { loading };
}

export default connect(mapStateToProps)(App);