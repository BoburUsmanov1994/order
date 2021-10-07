import React from 'react';
import styled, {css} from "styled-components";

const StyledRadio = styled.div`
  .radio {
    display: flex;
    align-items: center;
    &__circle {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border:1px solid transparent;
      padding: 2px;
      background-clip: content-box;
    }

    &__text {
      font-size: 12px;
      color: #707070;
      margin-left: 8px;
    }
  }

  ${({danger}) => danger && css`
    .radio__circle {
      background-color: #F02727;
      border-color: #F02727;
    }
  `};

  ${({warning}) => warning && css`
    .radio__circle {
      background-color: #F99600;
      border-color: #F99600;
    }
  `};

  ${({primary}) => primary && css`
    .radio__circle {
      background-color: #0058FF;
      border-color: #0058FF;
    }
  `};
  
  ${({success}) => success && css`
    .radio__circle {
      background-color: #55EFC4;
      border-color: #55EFC4;
    }
  `};
`;
const Radio = ({label='',...props}) => {
    return (
        <StyledRadio {...props}>
            <div className="radio">
                <div className="radio__circle"></div>
                <div className="radio__text">{label}</div>
            </div>
        </StyledRadio>
    );
};

export default Radio;
