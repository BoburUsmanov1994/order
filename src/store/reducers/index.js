import {combineReducers} from 'redux';
import normalizer from "./../../services/normalizer/Reducers";
import auth from "../../modules/auth/Reducers";
import order from "../../modules/order/Reducers";


export default combineReducers({
    normalizer,
    auth,
    order
});
