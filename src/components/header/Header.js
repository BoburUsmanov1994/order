import React from 'react';
import {Col, Container, Row} from "react-grid-system";
import styled from "styled-components";
import Logo from "../logo";
import Search from "../search";
import Flex from "../flex/Flex";
import {ReactSVG} from "react-svg";
import chatSvg from "../../assets/images/icons/chat.svg";
import Notification from "../notification";
import Profile from "../profile";
import burger from "../../assets/images/icons/burger.svg";

const StyledHeader = styled.header`
  padding-top: 15px;
  padding-bottom: 20px;
  padding-left: 15px;
  position: relative;
  .burger{
    position: absolute;
    left: -5px;
    top: 25px;
    cursor: pointer;
  }
`;
const Header = (props) => {
    return (
        <StyledHeader {...props}>
            <img className={'burger'} src={burger} alt=""/>
            <Container fluid>
                <Row>
                    <Col xs={7}>
                        <Logo/>
                    </Col>
                    <Col xs={5}>
                       <Flex justify={'flex-end'} align={'center'}> <Search/><ReactSVG src={chatSvg} className={'cursor-pointer'} /> <Notification /><Profile /></Flex>
                    </Col>
                </Row>
            </Container>
        </StyledHeader>
    );
};

export default Header;
