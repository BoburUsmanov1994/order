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


const StyledHeader = styled.header`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 0px;
  position: relative;
 
`;
const Header = ({profile,...props}) => {
    return (
        <StyledHeader {...props}>
            <Container fluid>
                <Row>
                    <Col xs={7}>
                        <Logo/>
                    </Col>
                    <Col xs={5}>
                       <Flex justify={'flex-end'} align={'center'}> <Search/><ReactSVG src={chatSvg} className={'cursor-pointer'} /> <Notification /><Profile profile={profile}/></Flex>
                    </Col>
                </Row>
            </Container>
        </StyledHeader>
    );
};

export default Header;
