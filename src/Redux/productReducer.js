const initialState = {
    products: []
}

const SET_PRODUCT = 'SET_PRODUCT';
const CLEAR_PRODUCT = 'CLEAR_PRODUCT';

export function setProduct(product){
    return {
        type: SET_PRODUCT,
        payload: product
    }
}
export function clearProduct(){
    return {
        type: CLEAR_PRODUCT,
        payload: []
    }
}



export default function reducer(state = initialState, action){
    const { type, payload } = action

    switch(type){
        case SET_PRODUCT:
            return {...state, user: payload}
        case CLEAR_PRODUCT:
            return {...state, user: payload}
        default:
            return state
    }
}
