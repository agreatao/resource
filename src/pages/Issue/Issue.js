import style from './Issue.scss';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import './highlight.css';

import marked from '@/utils/mark';
import {requestIssuesIfNeeded} from '@/store/actions/issue';
import RocketButton from '@/components/RocketButton/RocketButton';
import Loading from '@/components/Loading/Loading';

class Issue extends React.Component {
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
        if(loading) {
            return (<Loading/>);
        }
        const item = items[this.props.params.index];
        return (
            <div className={style.archive}>
                <div className={style.back}>
                    <Link to="/issues">
                        <i className="fa fa-code"></i>
                        <span>归档</span>
                    </Link>
                </div>
                <RocketButton />
                <div className={style.container}>
                    <div className={style.header}>
                        <h4>{item.title}</h4>
                        <div className={style.info}>
                            <div className={style.created}>
                                <i className="fa fa-calendar"></i>
                                <span>{item.created_at.substring(0, 10)}</span>
                            </div>
                            <div className={style.comments}>
                                <a>
                                    <i className="fa fa-comment-o"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={style.section}>
                        <div className={style.content} dangerouslySetInnerHTML={{__html: marked(item.body)}}></div>
                    </div>
                    <div className={style.footer}>
                        {
                            item.labels && item.labels.length > 0 ? (
                                <div className={style.labels}>
                                    {
                                        item.labels.map((label, index) => (
                                            <a key={index}>
                                                <i className="fa fa-paperclip"></i>
                                                <span>{label.name}</span>
                                            </a>
                                        ))
                                    }
                                </div>
                            ) : null
                        }
                        <div className={style.share}>
                            <a>
                                <i className="fa fa-share"></i>
                                <span>分享</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.comment}>
                        {/*<div className={style.header}>*/}
                        {/*<h4>评论</h4>*/}
                        {/*</div>*/}
                        {/*<div className={style.section}>*/}
                        {/*{*/}
                        {/*item.comments <= 0 ? (*/}
                        {/*<div className={style.emptyComments}>*/}
                        {/*<div>暂无评论</div>*/}
                        {/*</div>*/}
                        {/*) : (*/}
                        {/*null*/}
                        {/*)*/}
                        {/*}*/}
                        {/*</div>*/}
                        <div className={style.footer}>
                            <a className={style.commentBtn} href={item.html_url}>我要评论</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { issue, loading } = Object.assign({}, {
        loading: true,
        issue: {
            items: []
        }
    }, state);
    return { issue, loading };
}

export default connect(mapStateToProps)(Issue);