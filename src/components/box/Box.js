import React from 'react';
import styled,{css} from "styled-components";

const StyledBox = styled.div`
border-radius: 30px;
  padding: 30px;
  border:1px solid #979797;
  ${({oval}) => oval && css`
  border-radius: 15px;
  `};
`;
const Box = (props) => {
    return (
        <StyledBox {...props} />
    );
};

export default Box;
