import style from './Home.scss';

import React from 'react';
import { Link } from 'react-router';
import head from '@/assets/images/head.jpg';
import {connect} from 'react-redux';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className={style.home}>
                <div className={style.me}>
                    <div className={style.head}>
                        <a>
                            <img src={head} />
                        </a>
                    </div>
                    <div className={style.link}>
                        <Link to="/issues">
                            <i className="fa fa-code"></i>
                            <span>归档</span>
                        </Link>
                        <Link to="/about">
                            <i className="fa fa-user"></i>
                            <span>关于</span>
                        </Link>
                        <a>
                            <i className="fa fa-twitter"></i>
                            <span>twitter</span>
                        </a>
                        <a>
                            <i className="fa fa-github-alt"></i>
                            <span>github</span>
                        </a>
                        <a>
                            <i className="fa fa-wechat"></i>
                            <span>微信</span>
                        </a>
                        <a>
                            <i className="fa fa-rss"></i>
                            <span>订阅</span>
                        </a>
                    </div>
                </div>
                <div className={style.copyright}>
                    <p>&copy; 2018 Designed By Ao</p>
                </div>
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

export default connect(mapStateToProps)(Home);