const initialState = {
    user: {username: '', id: 0}
}

const   GET_USER = 'GET_USER';

export function getUser(user){
    console.log(user)
    return {
        type: GET_USER,
        payload: user
    }
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_USER:
            console.log(action.payload)
            return {user: action.payload};
        default:
            return initialState;
    }
}
