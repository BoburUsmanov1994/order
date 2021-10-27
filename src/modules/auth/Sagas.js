import {all, call, put, takeLatest} from "redux-saga/effects";
import {get} from "lodash";
import Actions from "./Actions";
import ApiService from "./ApiService";
import Storage from "../../services/local-storage/";
import Normalizer from "../../services/normalizer";
import NormalizerAction from "../../services/normalizer/Actions";
import actions from "../../services/normalizer/Actions";
import TokenScheme from "../../schema/TokenScheme";
import {toast} from "react-toastify";

function* checkAuthRequest(action) {
    const {token = null,user_id = null} = action.payload;
    try {
        const {data} = yield call(ApiService.GetMe, token,user_id);
        yield put({type: Actions.CHECK_AUTH.SUCCESS, payload: {user: get(data, 'users', {})}});

    } catch (e) {
        yield put({type: Actions.CHECK_AUTH.FAILURE});
    }
}


function* loginRequest(action) {
    const {
        payload: {
            email,
            password,
            setLoading
        },
    } = action;

    try {
        setLoading(true);
        const {data} = yield call(ApiService.Login, email, password);
        yield put({type: Actions.LOGIN.SUCCESS, payload: {token: data}});
        const normalizedData = yield call(Normalizer.Normalize,data, TokenScheme);
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {...normalizedData, storeName: 'get-token', entityName: 'token'},
        });
        setLoading(false);
    } catch (error) {
        setLoading(false);
        toast.error(error.response.data)
        yield put({type: Actions.LOGIN.FAILURE});
    }

}

function* loginSuccess(action) {
    if (action && action.payload && action.payload.token) {
        Storage.set("token", JSON.stringify(action.payload.token));
    }
}

function* loginFailure() {
    Storage.remove("token");
}


function* logoutAuth() {
    yield put({type: actions.NORMALIZE.TRIGGER, payload: {storeName: 'get-token'}});
    yield put({type: Actions.LOGIN.FAILURE});
    yield put({type: Actions.CHECK_AUTH.REQUEST,payload:{token:null,user_id:null}});
}


export default function* sagas() {
    yield all([
        takeLatest(Actions.CHECK_AUTH.REQUEST, checkAuthRequest),
        takeLatest(Actions.LOGIN.REQUEST, loginRequest),
        takeLatest(Actions.LOGIN.SUCCESS, loginSuccess),
        takeLatest(Actions.LOGIN.FAILURE, loginFailure),
        takeLatest(Actions.LOGOUT.REQUEST, logoutAuth),
    ]);
}
