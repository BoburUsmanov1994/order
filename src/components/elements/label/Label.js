import React from 'react';
import styled,{css} from "styled-components";

const StyledLabel = styled.label`
  font-size: 15px;
  color: #7E7E7E;
  display: block;
  margin-bottom: 10px;
  ${({hasBorder}) => hasBorder && css`
    padding-left: 20px;
    border-left: 1px solid #DE1010;
  `}
`;
const Label = (props) => {
    return (
        <StyledLabel {...props} />
    );
};

export default Label;
