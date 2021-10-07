import React from 'react';
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  padding: 15px;
  width: 100%;
  min-height: 200px;
  border: 1px solid #7E7E7E;
  border-radius: 5px;
  outline: none;
  font-size: 18px;
  font-weight: 300;
  color: #7E7E7E;
  font-family: 'Ubuntu',sans-serif;
  box-shadow: inset 0 3px 9px rgba(0,0,0,0.16);
`;
const Textarea = (props) => {
    return (
        <StyledTextarea {...props}/>
    );
};

export default Textarea;
