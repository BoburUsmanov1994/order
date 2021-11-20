import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {get,find,isEqual,sum} from "lodash";
import SubHeaderItem from "./SubHeaderItem";

const StyledSubHeaderBox = styled.div`
  padding: 12px 24px;
  border-top: 1px solid #707070;
  border-bottom: 1px solid #707070;
  @media screen and (max-width:1600px){
    
  }
`;
const SubHeaderBox = ({items = {},...props}) => {
    return (
        <StyledSubHeaderBox {...props}>
            <Row>
                <Col xs={3}>
                    <SubHeaderItem title={'Умумий ордерлар сони'} percent={100} count={sum(get(items,'orederscount',[]).map(({statuscount})=>statuscount))} success subtitle={'Охирги янгиланиш (1 кун)'}/>
                </Col>
                <Col xs={3}>
                    <SubHeaderItem title={'Янги берилган ордерлар'} percent={get(find(get(items,'persrnage'),item => isEqual(get(item,'name'),'янги берилган')),'per','-')} count={get(find(get(items,'orederscount'),item => isEqual(get(item,'statusname'),'янги берилган')),'statuscount','-')} subtitle={'Охирги янгиланиш (4 кун)'} info  hasBorderLeft/>
                </Col>
                <Col xs={3}>
                    <SubHeaderItem title={'Муддати узайтирилган ордерлар'} subtitle={'Охирги янгиланиш (1 кун)'} percent={get(find(get(items,'persrnage'),item => isEqual(get(item,'name'),'узайтирилган')),'per','-')} count={get(find(get(items,'orederscount'),item => isEqual(get(item,'statusname'),'узайтирилган')),'statuscount','-')} warning hasBorderLeft/>
                </Col>
                <Col xs={3}>
                    <SubHeaderItem title={'Муддати тугаган ордерлар'} subtitle={'Охирги янгиланиш (1 соат)'} percent={get(find(get(items,'persrnage'),item => isEqual(get(item,'name'),'тугатилган')),'per','-')} count={get(find(get(items,'orederscount'),item => isEqual(get(item,'statusname'),'тугатилган')),'statuscount','-')} success hasBorderLeft/>
                </Col>
            </Row>
        </StyledSubHeaderBox>
    );
};

export default SubHeaderBox;
