import React from 'react';
import styled, {css} from "styled-components";

const StyledTitle = styled.h2`
  font-size: 23px;
  font-weight: 700;
  color: #707070;
  line-height: 1.25;
  ${({primary}) => primary && css`
    color: #554B86;
  `};

  ${({sm}) => sm && css`
    font-size: 16px;
  `};

  ${({lg}) => lg && css`
    font-size: 28px;
  `};

  ${({xlg}) => xlg && css`
    font-size: 40px;
  `};
`;
const Title = (props) => {
    return (
        <StyledTitle {...props}/>
    );
};

export default Title;
