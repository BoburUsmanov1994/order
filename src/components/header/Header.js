import React,{useState,useEffect} from 'react';
import {Col, Container, Row} from "react-grid-system";
import styled from "styled-components";
import {connect} from "react-redux";
import Logo from "../logo";
import Flex from "../flex/Flex";
import Notification from "../notification";
import Profile from "../profile";
import burgerIcon from "../../assets/images/icons/burger.svg";
import Actions from "../../modules/order/Actions";


const StyledHeader = styled.header`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
  position: relative;

  .burger-menu {
    position: absolute;
    left: -25px;
    top: 10px;
    cursor: pointer;
  }
`;
const Header = ({profile,toggleBurger,...props}) => {
    const [toggle,setToggle] = useState(true);
    useEffect(()=>{
        toggleBurger(toggle);
    },[toggle]);
    return (
        <StyledHeader {...props}>
            <Container fluid>
                <Row>
                    <Col xs={7}>
                        <img src={burgerIcon} className={'burger-menu'} onClick={()=>setToggle(toggle=>!toggle)} alt=""/>
                        <Logo/>
                    </Col>
                    <Col xs={5}>
                       <Flex justify={'flex-end'} align={'center'}> <Notification /><Profile profile={profile}/></Flex>
                    </Col>
                </Row>
            </Container>
        </StyledHeader>
    );
};
const mapStateToProps = (state) => {
    return{}
}

const mapDispatchToProps = (dispatch) => {
    return{
        toggleBurger:(toggle) => dispatch({type:Actions.TOGGLE_BURGER.REQUEST,payload:{toggle}})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
