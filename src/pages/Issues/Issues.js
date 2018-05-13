import style from './Issues.scss';

import React from 'react';
import { Link } from 'react-router';
import { connect} from 'react-redux';

import { month } from '@/utils/date';

import { requestIssuesIfNeeded } from '@/store/actions/issue';
import Loading from '@/components/Loading/Loading';
import RocketButton from '@/components/RocketButton/RocketButton';

function spliceJson(items) {
    let articles = [],
        index = -1;
    for(let i = 0; i < items.length; i++) {
        let year = parseInt(items[i]['created_at'].substring(0, 4));
        items[i]['items_index'] = i;
        items[i]['created'] = {
            year: year,
            month: month(parseInt(items[i]['created_at'].substring(5, 7))),
            date: parseInt(items[i]['created_at'].substring(8, 10))
        };
        if((year - 2018) !== index) {
            index = year - 2018;
            articles[index] = {
                year: year,
                items: []
            };
        }
        items[i]['year_index'] = articles[index].items.length;
        articles[index].items.push(items[i]);
    }
    return articles.reverse();
}

class Issues extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        window.scrollTo(0, 0);
        const { dispatch } = this.props;
        dispatch(requestIssuesIfNeeded());
    }
    componentDidMount() {
    }
    render() {

        const { items, loading } = this.props.issue;
        if(loading === 1) {
            return (<Loading/>);
        }
        let articles = spliceJson(items);
        return (
            <div className={style.archives}>
                <div className={style.back}>
                    <Link to="/home">
                        <i className="fa fa-home"></i>
                        <span>Back to Home</span>
                    </Link>
                </div>
                <RocketButton />
                <div className={style.container}>
                    {
                       articles.map((item) => (
                            <div key={item.year} className={style.year}>
                                <h1>{item.year}</h1>
                                <div className={style.items}>
                                    <ul>
                                        {
                                            item.items.map((item, index) => (
                                                <li key={index}>
                                                    <div className={style.archive}>
                                                        <div className={style.date}>
                                                            <span>{item.created.date}</span>
                                                            <span className={style.month}>{item.created.month}</span>
                                                        </div>
                                                        <div className={style.item}>
                                                            <Link to={`/issue/${item.items_index}`} className={style.title} title={item.title}>
                                                                <span>{item.title}</span>
                                                            </Link>
                                                            <div className={style.prop}>
                                                                <div className={style.comments}>
                                                                    <i className="fa fa-comments"></i>
                                                                    <span>{item.comments}</span>
                                                                </div>
                                                                {
                                                                    item.labels && item.labels.length > 0 ? (
                                                                        <div className={style.tags}>
                                                                            <i className="fa fa-paperclip"></i>
                                                                            {
                                                                                item.labels.map((label, index) => (
                                                                                    <span key={index} className={style['color' + (index + 1)]}>{label.name}</span>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    ) : null
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
                    <div className={style.copyright}>
                        <p>&copy; 2018 Designed By Ao</p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { issue } = Object.assign({}, {
        issue: {
            loading: 1,
            items: []
        }
    }, state);
    return { issue };
}

export default connect(mapStateToProps)(Issues);