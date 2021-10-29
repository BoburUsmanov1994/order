import Actions from "./Actions";
import {get} from "lodash";

export default function OrderReducer(state = {}, action) {
    switch (action.type) {
        case Actions.TOGGLE_BURGER.REQUEST:
            return {
                ...state,
            }
        case Actions.TOGGLE_BURGER.SUCCESS:
            const {toggle} = action.payload;
            return {
                ...state,
                open:toggle
            }
        default:
            return state
    }
}
