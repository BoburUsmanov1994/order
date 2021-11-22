import React from 'react';
import styled from "styled-components";
import Progressbar from "./Progressbar";
import {get,capitalize,round} from "lodash";

const StyledProgressBox = styled.div`
  border: 1px solid #707070;
  padding: 10px 30px 30px 30px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const colors = ['#DC3539', '#2457F6', '#EB9B37'];
const ProgressBox = ({items, ...props}) => {
    return (
        <StyledProgressBox {...props}>
            {
                get(items, 'persrnage', []).map((item, index) => <Progressbar percent={round(get(item, 'per', '-'),2)}
                                                                              text={capitalize(get(item, 'name', '-'))}
                                                                              color={get(colors, `[${index}]`)}/>)
            }
        </StyledProgressBox>
    );
};

export default ProgressBox;
