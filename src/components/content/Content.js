import React from 'react';
import styled from "styled-components";

const StyledContent = styled.div`
  margin-left: 77px;
  padding-left: 25px;
  padding-right: 10px;
`;
const Content = (props) => {
    return (
        <StyledContent {...props} />
    );
};

export default Content;
