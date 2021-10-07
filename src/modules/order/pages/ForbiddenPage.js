import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import Title from "../../../components/title";
import img403 from "../../../assets/images/403.png";

const StyledForbiddenPage = styled.div`
  padding-top: 30px;
  img{
    max-width: 100%;
    height: auto;
  }
`;
const ForbiddenPage = (props) => {
    return (
        <StyledForbiddenPage {...props}>
            <Row justify={'center'}>
                <Col xs={12}>
                    <Title className={'text-center'} xlg>Саҳифага кириш учун чеклов ўрнатилган  </Title>
                </Col>
                <Col xs={8} className={'text-center'}>
                    <img src={img403} alt="403"/>
                </Col>
            </Row>
        </StyledForbiddenPage>
    );
};

export default ForbiddenPage;
