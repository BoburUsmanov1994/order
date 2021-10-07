import React from 'react';
import styled, {css} from "styled-components";
import rightArrow from "../../assets/images/icons/right-arrow.svg";

const StyledBadge = styled.span`
  border-radius: 7px;
  min-width: 30px;
  color: #fff;
  font-size: 8px;
  padding: 3px 5px;
  margin-left: 5px;
  img{
    margin-left: 5px;
  }
  ${({success}) => success && css`
    background-color: #21D59B;
  `};
  ${({warning}) => warning && css`
    background-color: #FFC700;
  `};
  ${({info}) => info && css`
    background-color: #57B8FF;
  `};
  ${({increase}) => increase && css`
    img{
      transform: rotate(-45deg);
    }
  `};
  ${({decrease}) => decrease && css`
    img{
      transform: rotate(45deg);
    }
  `};
`;
const Badge = ({percent = 0, ...props}) => {
    return (
        <StyledBadge {...props}>
            <span>{percent}</span>
            <img src={rightArrow} alt=""/>
        </StyledBadge>
    );
};

export default Badge;
