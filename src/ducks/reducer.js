import axios from 'axios';

const initialState = {
    username: '',
    profile: '',
    id:0,
    posts: []
}
const GET_USER = 'GET_USER';
const UPDATE_POSTS = 'UPDATE_POSTS';

export function getUser(userObj) {
    return {
        type: GET_USER,
        payload: userObj
    }
}
export function updatePosts(allPosts) {
    return {
        type: UPDATE_POSTS,
        payload: allPosts
    }
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_USER:
            const profile = action.payload.profile_pic;
            delete action.payload.profile_pic;
            return {...action.payload, profile};
        case UPDATE_POSTS:
            return {...state, posts:action.payload}
        default:
            return state
    }
}