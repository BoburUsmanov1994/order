import React from 'react';
import styled from "styled-components";
import Progressbar from "./Progressbar";

const StyledProgressBox = styled.div`
  border: 1px solid #707070;
  padding: 10px 30px 30px 30px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ProgressBox = (props) => {
    return (
        <StyledProgressBox {...props}>
            <Progressbar percent={57} text={'Умумий ордерлар сони'} color={'#DC3539'} />
            <Progressbar percent={88} text={'Жабрланувчилар'} color={'#2457F6'} />
            <Progressbar percent={30} text={'Айбдорлар'} color={'#EB9B37'} />
        </StyledProgressBox>
    );
};

export default ProgressBox;
