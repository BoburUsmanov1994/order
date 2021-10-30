import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import ViolentViewContainer from "../containers/ViolentViewContainer";

const ViolentViewPage = ({match}) => {
    return (
        <>
            <ViolentViewContainer id={get(match, 'params.id', null)}/>
        </>
    );
};

export default withRouter(ViolentViewPage);
