import {all, put, takeLatest} from "redux-saga/effects";
import Actions from "./Actions";
import storage from "../../services/local-storage";


function* toggleBurger(action) {
    const {toggle = true} = action.payload;
    const open = toggle ? 'open' : 'close';
    storage.set('open', open);
    yield put({type: Actions.TOGGLE_BURGER.SUCCESS, payload: {toggle:open}});

}

export default function* sagas() {
    yield all([
        takeLatest(Actions.TOGGLE_BURGER.REQUEST, toggleBurger),
    ]);
}
