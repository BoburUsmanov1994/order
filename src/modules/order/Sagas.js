import {all, call, put, takeLatest} from "redux-saga/effects";
import Actions from "./Actions";
import storage from "../../services/local-storage";
import ApiService from "./ApiService";
import {get} from "lodash";


function* toggleBurger(action) {
    const {toggle = true} = action.payload;
    const open = toggle ? 'open' : 'close';
    storage.set('open', open);
    yield put({type: Actions.TOGGLE_BURGER.SUCCESS, payload: {toggle:open}});

}

function* statisticsPlaceActionCounts(action) {
    try {
        const {data} = yield call(ApiService.StatisticsPlaceActionCounts);
        yield put({type: Actions.STATISTICS_PLACE_ACTION_COUNTS.SUCCESS, payload: {data}});

    } catch (e) {
        yield put({type: Actions.STATISTICS_PLACE_ACTION_COUNTS.FAILURE});
    }

}

function* statisticsOrderCounts(action) {
    try {
        const {data} = yield call(ApiService.StatisticsOrderCounts);
        yield put({type: Actions.STATISTICS_ORDER_COUNTS.SUCCESS, payload: {orders:data}});

    } catch (e) {
        yield put({type: Actions.STATISTICS_ORDER_COUNTS.FAILURE});
    }

}

export default function* sagas() {
    yield all([
        takeLatest(Actions.TOGGLE_BURGER.REQUEST, toggleBurger),
        takeLatest(Actions.STATISTICS_PLACE_ACTION_COUNTS.REQUEST, statisticsPlaceActionCounts),
        takeLatest(Actions.STATISTICS_ORDER_COUNTS.REQUEST, statisticsOrderCounts),
    ]);
}
