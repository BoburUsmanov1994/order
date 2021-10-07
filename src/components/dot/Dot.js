import React from 'react';
import styled,{css} from "styled-components";

const StyledDot = styled.div`
    .dot{
      display: flex;
      align-items: flex-start;
      width: 100%;
      &__circle{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        display: flex;
        margin-top: 3px;
      }
      &__text{
        margin-left: 10px;
        display: flex;
        justify-content: space-between;
        width: calc(100% - 25px);

        font-size: 14px;
        font-weight: 700;
        color: #B9B9B9;
        .title{}
        .percent{
          margin-left: 10px;
        }
      }
    }
  
  ${({success}) => success && css`
    .dot__circle{
      background-color: #2BCC71;
    }
  `};
  ${({danger}) => danger && css`
    .dot__circle{
      background-color: #E94C3D;
    }
  `};
  ${({primary}) => primary && css`
    .dot__circle{
      background-color: #5A51DE;
    }
  `};
  ${({warning}) => warning && css`
    .dot__circle{
      background-color: #F39B13;
    }
  `};
`;
const Dot = ({title='',percent=0,...props}) => {
    return (
        <StyledDot {...props}>
            <div className="dot">
                <div className="dot__circle"></div>
                <div className="dot__text"><span className={'title'}>{title}</span><span className={'percent'}>{percent}%</span></div>
            </div>
        </StyledDot>
    );
};

export default Dot;
