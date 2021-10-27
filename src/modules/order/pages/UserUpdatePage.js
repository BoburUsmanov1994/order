import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import UserUpdateContainer from "../containers/UserUpdateContainer";

const UserUpdatePage = ({match}) => {
    return (
        <>
            <UserUpdateContainer id = {get(match,'params.id',null)} />
        </>
    );
};

export default withRouter(UserUpdatePage);
