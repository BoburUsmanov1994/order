import React from 'react';
import styled from "styled-components";
import {Row,Col} from "react-grid-system";
import Title from "../../../components/title";
import img404 from "../../../assets/images/404.png";

const StyledNotFoundPage = styled.div`
    padding-top: 30px;
  img{
    max-width: 100%;
    height: auto;
  }
`;
const NotFoundPage = (props) => {
    return (
        <StyledNotFoundPage {...props}>
        <Row justify={'center'}>
            <Col xs={12}>
                <Title className={'text-center'} xlg>Саҳифа топилмади</Title>
            </Col>
            <Col xs={8} className={'text-center'}>
                <img src={img404} alt="404"/>
            </Col>
        </Row>
        </StyledNotFoundPage>
    );
};

export default NotFoundPage;
