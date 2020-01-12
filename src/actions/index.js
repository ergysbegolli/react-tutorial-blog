import _ from 'lodash';
import jsonPost from '../apis/jsonPost';

export const FetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(FetchPosts());
//    const userIds = _.uniq(_.map(getState().posts, 'userId'));
//    userIds.forEach(id => dispatch(FetchUser(id)));

    _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(FetchUser(id)))
    .value();
}

export const FetchPosts = () => async dispatch => {
        const response = await jsonPost.get('/posts');
        dispatch( { type: 'FETCH_POSTS', payload: response.data } );
    }

export const FetchUser = id => async dispatch => {
    const response = await jsonPost.get(`/users/${id}`);
    dispatch( { type: 'FETCH_USER', payload: response.data } )
}