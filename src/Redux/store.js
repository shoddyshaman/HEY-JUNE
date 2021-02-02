import {createStore, combineReducers} from 'redux';
import userReducer from './userReducer';
import bagReducer from './bagReducer';

const rootReducer = combineReducers({
    userReducer: userReducer,
    bagReducer: bagReducer
})

export default createStore(rootReducer)


