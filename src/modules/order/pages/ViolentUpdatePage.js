import React from 'react';
import {get} from "lodash";
import {withRouter} from "react-router-dom";
import ViolentUpdateContainer from "../containers/ViolentUpdateContainer";

const ViolentUpdatePage = ({match}) => {
    return (
        <>
            <ViolentUpdateContainer id={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(ViolentUpdatePage);
