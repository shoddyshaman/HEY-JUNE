const initialState = {
    user: {},
}

const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

export function setUser(userObj){
    return {
        type: SET_USER,
        payload: userObj
    }
}

export function clearUser(){
    return {
        type: CLEAR_USER,
        payload: {}
    }
}

export default function reducer(state = initialState, action){
    const { type, payload } = action

    switch(type){
        case SET_USER:
            return {...state, user: payload}
        case CLEAR_USER:
            return {...state, user: payload}
        default:
            return state
    }
}