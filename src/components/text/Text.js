import React from 'react';
import styled, {css} from "styled-components";

const StyledText = styled.p`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #666666;

  ${({primary}) => primary && css`
    color: #817C9B;
  `};
  ${({md}) => md && css`
    font-size: 18px;
  `};
  ${({medium}) => medium && css`
    font-weight: 500;
  `};
  ${({danger}) => danger && css`
    color: #F76652;
  `};
`;
const Text = (props) => {
    return (
        <StyledText {...props} />
    );
};

export default Text;
