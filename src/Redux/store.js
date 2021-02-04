import {createStore, combineReducers} from 'redux';
import userReducer from './userReducer';
import bagReducer from './bagReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    userReducer: userReducer,
    bagReducer: bagReducer,
    productReducer: productReducer
})

export default createStore(rootReducer)


