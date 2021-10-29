import React from 'react';
import styled, {css} from "styled-components";
import {Row,Col} from "react-grid-system";
import Text from "../../text";

const StyledInput = styled.input`
min-width: 250px;
  padding: 15px 25px;
  border-radius: 5px;
  border: 1px solid #707070;
  outline: none;
  font-size: 16px;
  font-weight: 300;
  color: #7E7E7E;
  font-family: 'Ubuntu', sans-serif;
  //border: 1px solid ${({error}) => error ? '#E92C2C' : '#E8E8E8'};
  ${({sm}) => sm && css`
    padding: 10px;
    width: 100%;
    font-size: 16px;
  `}
`;
const Input = ({
                   defaultValue = '', placeholder = '', register = null,
                   name,
                   type = 'text',
                   label = '',
                   validation,
                   error,
                   disabled = false, ...props
               }) => {
    return (
        <Row>
            <Col xs={12}>
                <StyledInput error={error}  {...props} {...register(name, {...validation})} defaultValue={defaultValue} disabled={disabled}
                             placeholder={placeholder}
                             type={type} />
            </Col>

            <Col xs={12}>
                <Text xs danger>{error && error.type == 'required' && `${label} майдон тўлдирилиши шарт`}</Text>
                <Text xs danger>{error && error.type == 'pattern' && `${label} яроқли эмас`}</Text>
                <Text xs danger>{error && error.type == 'validation' && `${error.message} `}</Text>
            </Col>
        </Row>
    );
};

export default Input;
