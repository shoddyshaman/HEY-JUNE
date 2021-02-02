const initialState = {
    bag: []
}

const SET_BAG = 'SET_BAG';

export function setBag(bag) {
    return {
        type: SET_BAG,
        payload: bag
    }
}

export default function reducer(state = initialState, action){
    const { type, payload } = action

    switch(type) {
        case SET_BAG:
            return{...state, user: payload}
        default: 
            return state
    }
}
