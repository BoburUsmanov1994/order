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
        case Actions.STATISTICS_PLACE_ACTION_COUNTS.REQUEST:
            return {
                ...state,
                statistics_place_action_counts:{
                    data:{},
                    isFetched:false
                }
            }
        case Actions.STATISTICS_PLACE_ACTION_COUNTS.SUCCESS:
            const {data} = action.payload;
            return {
                ...state,
                statistics_place_action_counts:{
                    data:data,
                    isFetched: true
                }
            }
        case Actions.STATISTICS_PLACE_ACTION_COUNTS.FAILURE:
            return {
                ...state,
                statistics_place_action_counts:{
                    data:{},
                    isFetched: true
                }
            }
        case Actions.STATISTICS_ORDER_COUNTS.REQUEST:
            return {
                ...state,
                statistics_order_counts:{
                    data:{},
                    isFetched:false
                }
            }
        case Actions.STATISTICS_ORDER_COUNTS.SUCCESS:
            const {orders} = action.payload;
            return {
                ...state,
                statistics_order_counts:{
                    data:orders,
                    isFetched: true
                }
            }
        case Actions.STATISTICS_ORDER_COUNTS.FAILURE:
            return {
                ...state,
                statistics_order_counts:{
                    data:{},
                    isFetched: true
                }
            }
        default:
            return state
    }
}
