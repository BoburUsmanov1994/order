import React from 'react';
import styled, {css} from "styled-components";

const StyledTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #707070;
  line-height: 1.25;
  ${({primary}) => primary && css`
    color: #554B86;
  `};

  ${({sm}) => sm && css`
    font-size: 14px;
  `};

  ${({lg}) => lg && css`
    font-size: 26px;
  `};

  ${({xlg}) => xlg && css`
    font-size: 36px;
  `};
`;
const Title = (props) => {
    return (
        <StyledTitle {...props}/>
    );
};

export default Title;
