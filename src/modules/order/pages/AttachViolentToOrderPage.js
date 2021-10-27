import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import AttachViolentToOrderContainer from "../containers/AttachViolentToOrderContainer";

const AttachViolentToOrderPage = ({match}) => {
    return (
        <>
            <AttachViolentToOrderContainer id={get(match,'params.id')}/>
        </>
    );
};

export default withRouter(AttachViolentToOrderPage);
