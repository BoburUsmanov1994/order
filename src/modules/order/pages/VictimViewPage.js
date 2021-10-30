import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import VictimViewContainer from "../containers/VictimViewContainer";

const VictimViewPage = ({match}) => {
    return (
        <>
            <VictimViewContainer id={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(VictimViewPage);
