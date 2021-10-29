import React from 'react';
import styled from "styled-components";
import {isEqual} from "lodash";

const StyledContent = styled.div`
  margin-left:${({theme:{open}}) => isEqual(open,'open') ? '300px' : '80px'};
  padding-left: 25px;
  padding-right: 10px;
`;
const Content = (props) => {
    return (
        <StyledContent {...props} />
    );
};

export default Content;
