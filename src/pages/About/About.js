import style from './About.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class About extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    render() {
        return (
          <div className={style.about}>
              <div className={style.back}>
                  <Link to="/home">
                      <i className="fa fa-home"></i>
                      <span>Back to Home</span>
                  </Link>
              </div>
              <div className={style.background}></div>
              <div className={style.text}>页面开发中...</div>
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

export default connect(mapStateToProps)(About);