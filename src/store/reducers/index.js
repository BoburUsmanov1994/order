import {combineReducers} from 'redux';
import normalizer from "./../../services/normalizer/Reducers";
import auth from "../../modules/auth/Reducers";
import order from "../../modules/order/Reducers";
import api from "../../services/api/reducer";


export default combineReducers({
    normalizer,
    auth,
    order,
    api
});
