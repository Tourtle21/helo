const initialState = {
    username: '',
    profile: '',
    id:0
}
const GET_USER = 'GET_USER';

export function getUser(userObj) {
    return {
        type: GET_USER,
        payload: userObj
    }
}

export default function reducerß(state=initialState, action) {
    switch (action.type) {
        case GET_USER:
            const profile = action.payload.profile_pic;
            delete action.payload.profile_pic;
            return {...action.payload, profile};
        default:
            return state
    }
}