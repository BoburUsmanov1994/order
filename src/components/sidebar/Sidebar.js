import React from 'react';
import styled from "styled-components";
import {Link, NavLink} from "react-router-dom";
import {isEqual} from "lodash";
import Menu from "../menu";
import {ReactSVG} from "react-svg";
import exitIcon from "../../assets/images/icons/exit.svg";
import mvd from "../../assets/images/mvd-logo.png";

const StyledSidebar = styled.div`
  width: ${({theme:{open}}) => isEqual(open,'open') ? '300px' : '80px'};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid #E5E5E5;
  z-index: 99;
  background-color: #fff;
  .sidebar {
    &__logo {
      padding-top: 15px;
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #E5E5E5;
      img {
        width: ${({theme:{open}}) => isEqual(open,'open') ? '80px' : '50px'};
      }
    }

    &__bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: center;

      a {
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;
const Sidebar = (props) => {
    return (
        <StyledSidebar {...props}>
            <div className="sidebar__logo">
                <Link to={'/'}>
                    <img src={mvd} alt=""/>
                </Link>
            </div>
            <Menu/>
            <div className="sidebar__bottom">
                <NavLink to={'/logout'}>
                    <ReactSVG src={exitIcon}/>
                </NavLink>
            </div>
        </StyledSidebar>
    );
};

export default Sidebar;
