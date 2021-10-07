import React from 'react';
import styled from "styled-components";
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

const StyledCustomCheckbox = styled.div`
  display: flex;
  align-items: center;
    cursor: pointer;
  .rc-checkbox-inner {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    border-color: #B7B7B7;
    border-width: 3px;
    margin-right: 15px;
  }

  .rc-checkbox-checked .rc-checkbox-inner {
    background-color: transparent;
    border-color: #21D59B;
 

    &:after {
      border-color: #21D59B;
    }
  }
  .rc-checkbox:hover .rc-checkbox-inner, .rc-checkbox-input:focus + .rc-checkbox-inner{
    border-color: #21D59B;
  }
  label{
    display: flex;
    align-items: center;
  }
`;
const CustomCheckbox = ({label,defaultChecked=false,handleChange = () => {},...props}) => {
    return (
        <StyledCustomCheckbox {...props}>
             <label><Checkbox onChange={handleChange} defaultChecked={defaultChecked}/><span>{label}</span></label>
        </StyledCustomCheckbox>
    );
};

export default CustomCheckbox;
