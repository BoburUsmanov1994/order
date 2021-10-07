import React from 'react';
import styled from "styled-components";

const StyledInput = styled.input`
  min-width: 300px;
  padding: 15px 25px;
  border-radius: 5px;
  border: 1px solid #707070;
  outline: none;
  font-size: 18px;
  font-weight: 300;
  color: #7E7E7E;
  font-family: 'Ubuntu',sans-serif;
`;
const Input = ({defaultValue='',placeholder='',...props}) => {
    return (
        <StyledInput {...props} placeholder={placeholder} value={defaultValue} />
    );
};

export default Input;
