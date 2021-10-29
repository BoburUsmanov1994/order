import React from 'react';
import styled from "styled-components";

const StyledLine = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;
  border-top: 1px solid #707070;
  border-bottom: 1px solid #707070;
  color: #707070;
  font-size: 30px;
  font-weight: 700;
  @media screen and (max-width:1600px){
   font-size: 24px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
`;
const Line = (props) => {
    return (
        <StyledLine {...props} />
    );
};

export default Line;
