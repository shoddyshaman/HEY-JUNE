const initialState = {
    bag: []
}

const SET_BAG = 'SET_BAG';
const CLEAR_BAG = 'CLEAR_BAG';

export function setBag(bag) {
    return {
        type: SET_BAG,
        payload: bag
    }
}

export function clearBag(bag) {
    return {
        type: CLEAR_BAG,
        payload: []
    }
}

export default function reducer(state = initialState, action){
    const { type, payload } = action

    switch(type) {
        case SET_BAG:
            return{...state, bag: payload}
        case CLEAR_BAG:
            return{...state, bag: payload}
        default: 
            return state
    }
}
