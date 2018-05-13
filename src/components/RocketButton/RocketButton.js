import style from './RocketButton.scss';

import React from 'react';

import { scroll, onScroll, removeScroll, currentY } from '@/utils/scroll';

class RocketButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTop: true,
            isLaunch: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.windowScroll = this.windowScroll.bind(this);
    }
    componentDidMount() {
        onScroll(this.windowScroll);
    }
    componentWillUnmount() {
        removeScroll(this.windowScroll);
    }
    windowScroll() {
        let currentTop = currentY();
        if(currentTop > 100) {
            this.setState({
                isTop: false
            });
        } else {
            this.setState({
                isTop: true,
                isLaunch: false
            });
        }
    }
    handleClick() {
        this.setState({
            isLaunch: true
        });
        scroll();
    }
    render() {
        return (
            <a className={`${style.rocket} ${this.state.isTop ? '' : style.show} ${this.state.isLaunch ? style.launch:''}`} onClick={this.handleClick}>
                <span></span>
            </a>
        );
    }
}

export default RocketButton;
