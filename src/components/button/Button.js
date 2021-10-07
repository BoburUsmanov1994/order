import React from 'react';
import styled, {css} from "styled-components";

const StyledButton = styled.button`
  min-width: 150px;
  text-align: center;
  border: unset;
  outline: none;
  padding: 15px 30px;
  color: #797979;
  font-size: 15px;
  font-weight: 700;
  border-radius: 27px;
  display: inline-block;
  cursor: pointer;

  ${({outlined}) => outlined && css`
    background-color: transparent !important;
    border:1px solid #707070;
  `}

  ${({danger}) => danger && css`
    background-color: transparent;
    border-color: #EF142F;
    color: #EF142F;
    background-color: #EF142F;
  `}
  
  ${({success}) => success && css`
    color: #fff;
    background-color: #21D59B;
  `}

  ${({lg}) => lg && css`
    min-width: 250px;
  `}
  ${({thin}) => thin && css`
   font-weight: 300;
  `}
`;
const Button = ({handleClick = () => {},...props}) => {
    return (
        <StyledButton onClick={() => handleClick()} {...props} />
    );
};

export default Button;
