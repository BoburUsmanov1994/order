import {createRoutine} from "redux-saga-routines";

const GET_REGIONS = createRoutine("GET_REGIONS");
const GET_REGION= createRoutine("GET_REGION");
const CREATE_REGION = createRoutine("CREATE_REGION");
const UPDATE_REGION = createRoutine("UPDATE_REGION");
const DELETE_REGION = createRoutine("DELETE_REGION");
const TOGGLE_BURGER = createRoutine("TOGGLE_BURGER");

export default {
    GET_REGIONS,
    GET_REGION,
    CREATE_REGION,
    UPDATE_REGION,
    DELETE_REGION,
    TOGGLE_BURGER
}
