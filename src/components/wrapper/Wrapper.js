import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
@media screen and (max-width:1800px){
  width: 1800px;
  overflow-x: auto;
}
`;
const Wrapper = (props) => {
    return (
        <StyledWrapper  {...props}/>
    );
};

export default Wrapper;
