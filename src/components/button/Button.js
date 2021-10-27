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
    border: 1px solid #707070;
  `}


  ${({danger}) => danger && css`
    border-color: #EF142F !important;
    color: #EF142F !important;
    background-color: #EF142F !important;
  `}

  ${({primary}) => primary && css`
    border-color: #2457F6 !important;
    color: #2457F6 !important;
    background-color: #2457F6 !important;
  `}

  ${({success}) => success && css`
    color: #fff;
    background-color: #21D59B !important;
    border-color: #21D59B !important;
  `}
  ${({status}) => status && css`
    background-color: transparent !important;
    border: 1px solid #707070;
    border-radius: 5px;
    font-weight: 300;
    padding: 10px 15px;
    color: #21D59B;
  `}
  ${({back,danger}) => back && danger && css`
      color: #fff !important;
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
