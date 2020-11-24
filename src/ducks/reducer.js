const initialState = {
    user: {username: '', id: 0}
}

const GET_USER = 'GET_USER';
const CLEAR_USER = 'CLEAR_USER';
export function getUser(user){
    return {
        type: GET_USER,
        payload: user
    }
}

export function clearUser(){
    return {
        type: CLEAR_USER,
        payload: {}
    }
}

export default function (state = initialState, action){
    const {type,payload} = action;
    switch(type){
        case GET_USER:
            return {user: payload};
        case CLEAR_USER:
            return {...state, user: payload};
        default:
            return initialState;
    }
}
