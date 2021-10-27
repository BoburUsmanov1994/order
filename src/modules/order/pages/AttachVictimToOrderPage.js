import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import AttachVictimToOrderContainer from "../containers/AttachVictimToOrderContainer";

const AttachVictimToOrderPage = ({match}) => {
    return (
        <>
            <AttachVictimToOrderContainer id={get(match,'params.id')}/>
        </>
    );
};

export default withRouter(AttachVictimToOrderPage);
