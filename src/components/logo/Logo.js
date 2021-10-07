import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import logo from "../../assets/images/logo.svg";

const StyledLogo = styled.div`
  a {
    display: flex;
    align-items: start;

    span {
      padding-left: 30px;
      color: #707070;
      font-weight: 700;
      font-size: 30px;
      line-height: 1.25;
      display: inline-block;
      margin-top: 6px;
    }
  }
`;
const Logo = (props) => {
    return (
        <StyledLogo {...props}>
            <Link to={'/'}>
                <img src={logo} alt="logo"/>
                <span>Тазйиқ ва зўравонликдан жабрланган <br/>
хотин-қизларни хисобга олиш ягона ахборот тизими </span>
            </Link>
        </StyledLogo>
    );
};

export default Logo;
