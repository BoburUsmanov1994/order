import React from 'react';
import styled,{css} from "styled-components";

const StyledText = styled.p`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  
  ${({primary}) => primary && css`
  color: #817C9B;
  `};
  ${({md}) => md && css`
 font-size: 15px;
  `};
`;
const Text = (props) => {
    return (
        <StyledText {...props} />
    );
};

export default Text;
