const initialState = {
    products: [],
    product: {}
}

const SET_PRODUCT = 'SET_PRODUCT';
const SET_PRODUCTS = 'SET_PRODUCTS';
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

export function setProducts(products){
    return {
        type: SET_PRODUCTS,
        payload: products
    }
}



export default function reducer(state = initialState, action){
    const { type, payload } = action

    switch(type){
        case SET_PRODUCT:
            return {...state, product: payload}
        case CLEAR_PRODUCT:
            return {...state, product: payload}
        case SET_PRODUCTS:
            return {...state, products: payload}
        default:
            return state
    }
}
