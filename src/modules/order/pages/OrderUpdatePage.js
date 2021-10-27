import React from 'react';
import {get} from "lodash";
import {withRouter} from "react-router-dom";
import OrderUpdateContainer from "../containers/OrderUpdateContainer";

const OrderUpdatePage = ({match}) => {
    return (
        <>
            <OrderUpdateContainer id={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(OrderUpdatePage);
