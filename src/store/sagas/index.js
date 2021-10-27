import {all} from 'redux-saga/effects';
import normalizer from "../../services/normalizer/Sagas";
import api from "./../../services/api/Saga";
import auth from "../../modules/auth/Sagas";
import order from "../../modules/order/Sagas";

export default function* sagas() {
    yield all([
        normalizer(),
        api(),
        auth(),
        order()
    ]);
}
