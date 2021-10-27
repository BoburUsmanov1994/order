import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import UserViewContainer from "../containers/UserViewContainer";

const UserViewPage = ({match}) => {
    return (
        <>
           <UserViewContainer id={get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(UserViewPage);
