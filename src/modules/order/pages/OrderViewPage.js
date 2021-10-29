import React from 'react';
import {get} from "lodash";
import {withRouter} from "react-router-dom";
import OrderViewContainer from "../containers/OrderViewContainer";

const OrderViewPage = ({match}) => {
    return (
        <>
            <OrderViewContainer id={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(OrderViewPage);
