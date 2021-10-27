import React from 'react';
import {get} from "lodash";
import {withRouter} from "react-router-dom";
import VictimUpdateContainer from "../containers/VictimUpdateContainer";

const VictimUpdatePage = ({match}) => {
    return (
        <>
            <VictimUpdateContainer id={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(VictimUpdatePage);
