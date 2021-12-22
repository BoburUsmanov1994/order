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
    const {params} = action.payload;
    try {
        const {data} = yield call(ApiService.StatisticsOrderCounts,{...params});

        yield put({type: Actions.STATISTICS_ORDER_COUNTS.SUCCESS, payload: {orders:data}});

    } catch (e) {
        yield put({type: Actions.STATISTICS_ORDER_COUNTS.FAILURE});
    }
}
function* statisticsTypeViolence(action) {
    try {
        const {data} = yield call(ApiService.StatisticsTypeViolence);
        yield put({type: Actions.STATISTICS_TYPE_VIOLENCE.SUCCESS, payload: {types:data}});

    } catch (e) {
        yield put({type: Actions.STATISTICS_TYPE_VIOLENCE.FAILURE});
    }
}

function* statisticsVictimCount(action) {
    try {
        const {data} = yield call(ApiService.StatisticsVictimCount);
        yield put({type: Actions.STATISTICS_VICTIM_COUNT.SUCCESS, payload: {general:data}});

    } catch (e) {
        yield put({type: Actions.STATISTICS_VICTIM_COUNT.FAILURE});
    }
}

function* getMonthlyStatistics(action) {
    try {
        const {data} = yield call(ApiService.MonthlyStatistics);
        yield put({type: Actions.GET_MONTHLY_STATISTICS.SUCCESS, payload: {monthly:data}});
    } catch (e) {
        yield put({type: Actions.GET_MONTHLY_STATISTICS.FAILURE});
    }
}

export default function* sagas() {
    yield all([
        takeLatest(Actions.TOGGLE_BURGER.REQUEST, toggleBurger),
        takeLatest(Actions.STATISTICS_PLACE_ACTION_COUNTS.REQUEST, statisticsPlaceActionCounts),
        takeLatest(Actions.STATISTICS_ORDER_COUNTS.REQUEST, statisticsOrderCounts),
        takeLatest(Actions.STATISTICS_TYPE_VIOLENCE.REQUEST, statisticsTypeViolence),
        takeLatest(Actions.STATISTICS_VICTIM_COUNT.REQUEST, statisticsVictimCount),
        takeLatest(Actions.GET_MONTHLY_STATISTICS.REQUEST, getMonthlyStatistics),
    ]);
}
