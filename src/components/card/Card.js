import React from 'react';
import styled, {css} from "styled-components";
import {ReactSVG} from "react-svg";
import triangle from "../../assets/images/icons/triangle.svg"

const StyledCard = styled.div`
  width: 180px;
  padding: 15px;
  border-radius: 30px;
  margin-right: 15px;
  margin-bottom: 15px;
  .card{
    &__title{
      color: #4B4279;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 5px;
    }
    &__bottom{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__count{
      font-size: 22px;
      font-weight: 600;
    }
    &__percent{
      display: flex;
      font-size: 12px;
      color: #817C9B;
      .icon{
        margin-left: 3px;
       
      }
    }
  }
  ${({danger}) => danger && css`
    background-color: #FFF8FA;
    .card__count{
      color: #DF0A56;
    }
    .card__percent .icon svg path{
      fill: #F0142F;
    }
  `};
  ${({success}) => success && css`
    background-color: #E6FFF8;
    .card__count{
      color: #26A26B;
    }
    .card__percent .icon svg path{
      fill: #6DB324;
    }
  `};

  ${({primary}) => primary && css`
    background-color: #EEECF9;
    .card__count{
      color: #554B86;
    }
    .card__percent .icon svg path{
      fill: #6DB324;
    }
  `};

  ${({warning}) => warning && css`
    background-color: #FFF7F2;
    .card__count{
      color: #D36216;
    }
    .card__percent .icon svg path{
      fill: #6DB324;
    }
  `};
`;
const Card = ({title='',count=0,percent=0,...props}) => {
    return (
        <StyledCard {...props}>
            <h2 className={'card__title'}>{title}</h2>
            <div className={'card__bottom'}>
                <h2 className="card__count">{count}</h2>
                <span className="card__percent">{percent}% <ReactSVG className={'icon'} src={triangle} /></span>
            </div>
        </StyledCard>
    );
};

export default Card;
