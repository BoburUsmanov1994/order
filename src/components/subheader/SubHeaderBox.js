import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import SubHeaderItem from "./SubHeaderItem";

const StyledSubHeaderBox = styled.div`
  padding: 12px 24px;
  border-top: 1px solid #707070;
  border-bottom: 1px solid #707070;
  @media screen and (max-width:1600px){
    
  }
`;
const SubHeaderBox = (props) => {
    return (
        <StyledSubHeaderBox {...props}>
            <Row>
                <Col xs={3}>
                    <SubHeaderItem title={'Умумий ордерлар сони'} percent={'5.21'} count={21} success subtitle={'Охирги янгиланиш (1 кун)'}/>
                </Col>
                <Col xs={3}>
                    <SubHeaderItem title={'Янги берилган ордерлар'} percent={'2.13'} count={30} subtitle={'Охирги янгиланиш (4 кун)'} info  hasBorderLeft/>
                </Col>
                <Col xs={3}>
                    <SubHeaderItem title={'Муддати узайтирилган ордерлар'} subtitle={'Охирги янгиланиш (1 кун)'} percent={'0.45'} count={2} warning hasBorderLeft/>
                </Col>
                <Col xs={3}>
                    <SubHeaderItem title={'Муддати тугаган ордерлар'} subtitle={'Охирги янгиланиш (1 соат)'} percent={'13.94'} count={123} success hasBorderLeft/>
                </Col>
            </Row>
        </StyledSubHeaderBox>
    );
};

export default SubHeaderBox;
