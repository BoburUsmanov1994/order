import React from 'react';
import {withRouter} from "react-router-dom";
import {get} from "lodash";
import RegionContainer from "../containers/RegionContainer";

const RegionPage = ({match}) => {
    return (
        <>
            <RegionContainer id={get(match, 'params.id', null)}/>
        </>
    );
};

export default withRouter(RegionPage);
