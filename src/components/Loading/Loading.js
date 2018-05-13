import style from './Loading.scss';

import React from 'react';

class Loading extends React.Component {
    render() {
        return (
            <div className={style.loading}>
                <div className={style.container}>
                    <h1>Hello!</h1>
                    <p>&copy; 2018 Designed By Ao</p>
                </div>
            </div>
        );
    }
}

export default Loading;