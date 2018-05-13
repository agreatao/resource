import { RECEIVE_ISSUES, REQUEST_ISSUES } from '../actionTypes/issue';
import { get } from '@/github/index';
import { CONFIG } from '@/constants/config';

export const loadingIssues = () =>({
    type: REQUEST_ISSUES
});

export const receiveIssues = (items) => ({
    type: RECEIVE_ISSUES,
    items: items
});

export const requestIssues = () => (dispatch) => {
    document.title = CONFIG.titleLoad;
    dispatch(loadingIssues());
    get('/issues')
        .then(items => {
            document.title = CONFIG.title;
            dispatch(receiveIssues(items));
        });
};

function shouldRequestIssues(state) {
    return !state || !state.issue || !state.issue.items || !state.issue.items.length;
}

export const requestIssuesIfNeeded = () => (dispatch, getState) => {
    if(shouldRequestIssues(getState())) {
        return dispatch(requestIssues());
    } else {
        return Promise.resolve();
    }
};

// export const fetchIssueIfNeeded = (index, comments_page) => (dispatch, getState) => {
//     dispatch(loading());
//     if(shouldFetchIssues(getState())) {
//         get('/issues')
//             .then(items => {
//                 if(items.length > index) {
//                     let item = items[index];
//                     get(`/issues/${item.number}/comments`, {
//                         per_page: 10,
//                         page: comments_page
//                     }).then(comment_list => {
//                         if(!item.comment_list) item.comment_list = [];
//                         item.comment_list[comments_page - 1] = comment_list;
//                         dispatch(receiveIssue(items, item, comment_list, comments_page, Math.round((item.comments - 1) / 10 + 1)));
//                         dispatch(loaded());
//                     });
//                 }
//             });
//     }
//     else {
//         let items = getState().issues.items;
//         let item = items[index];
//         if(item.comment_list && item.comment_list[comments_page - 1] && item.comment_list[comments_page - 1].length > 0) {
//             dispatch(receiveIssue(items, item, item.comment_list[comments_page - 1], comments_page, Math.round((item.comments - 1) / 10 + 1)));
//             dispatch(loaded());
//         } else {
//             get(`/issues/${item.number}/comments`, {
//                     per_page: 10,
//                     page: comments_page
//                 })
//                 .then(comment_list => {
//                     if(!item.comment_list) item.comment_list = [];
//                     item.comment_list[comments_page - 1] = comment_list;
//                     dispatch(receiveIssue(items, item, comment_list, comments_page, Math.round((item.comments - 1) / 10 + 1)));
//                     dispatch(loaded());
//                 });
//         }
//     }
// };
