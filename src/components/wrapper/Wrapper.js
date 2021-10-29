import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
@media screen and (max-width:1300px){
  width: 1200px;
  overflow-x: auto;
}
`;
const Wrapper = (props) => {
    return (
        <StyledWrapper  {...props}/>
    );
};

export default Wrapper;
