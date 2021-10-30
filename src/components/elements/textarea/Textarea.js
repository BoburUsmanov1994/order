import React from 'react';
import styled, {css} from "styled-components";
import {Col, Row} from "react-grid-system";
import Text from "../../text";

const StyledTextarea = styled.textarea`
  padding: 15px;
  width: 100%;
  min-height: 200px;
  //border: 1px solid ${({error}) => error ? '#E92C2C' : '#E8E8E8'};
  border-color: #E8E8E8;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  font-weight: 300;
  color: #7E7E7E;
  font-family: 'Ubuntu', sans-serif;
  box-shadow: inset 0 3px 9px rgba(0, 0, 0, 0.16);
  ${({noshadow}) => noshadow && css`
    box-shadow: unset;
  `};
  ${({sm}) => sm && css`
    min-height: 150px;
  `};
`;
const Textarea = ({
                      defaultValue = '',
                      placeholder = '',
                      register = null,
                      name,
                      label = '',
                      validation,
                      error,
                      disabled = false,
                      ...props
                  }) => {
    return (
        <Row>
            <Col xs={12}>
                <StyledTextarea error={error}  {...props} {...register(name, {...validation})} defaultValue={defaultValue}
                                disabled={disabled}
                                placeholder={placeholder} {...props}/>
            </Col>
            <Col xs={12}>
                <Col xs={12}>
                    <Text xs danger>{error && error.type == 'required' && `${label} майдон тўлдирилиши шарт`}</Text>
                    <Text xs danger>{error && error.type == 'pattern' && `${label} is not valid`}</Text>
                    <Text xs danger>{error && error.type == 'validation' && `${error.message} `}</Text>
                </Col>
            </Col>
        </Row>

    );
};

export default Textarea;
