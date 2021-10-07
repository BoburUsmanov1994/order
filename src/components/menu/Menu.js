import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {ReactSVG} from "react-svg";
import dashboardIcon from "../../assets/images/icons/dashboard.svg";
import graphIcon from "../../assets/images/icons/graph.svg";
import appointmentsIcon from "../../assets/images/icons/appointments.svg";
import enquiriesIcon from "../../assets/images/icons/enquiries.svg";
import clipboardIcon from "../../assets/images/icons/clipboard.svg";
import usersIcon from "../../assets/images/icons/users.svg";
import bookmarkIcon from "../../assets/images/icons/bookmark.svg";

const StyledMenu = styled.ul`
  padding-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  li{
    margin-bottom: 35px;
    a.active{
      position: relative;
      &:after{
        position: absolute;
        content:"";
        height: 30px;
        width: 3px;
        border-radius: 10px;
        background-color: #FFA101;
        right: -47px;
        z-index: 9;
        top: -6px;
      }
      svg{
         path,rect{
          fill: #322A7D !important;
        }
      }
    }
    &:last-child{
      margin-bottom: 0;
    }
  }
`;
const Menu = ({items, ...props}) => {
    return (
        <StyledMenu {...props}>
            <li>
                <NavLink to={'/'} exact>
                    <ReactSVG src={dashboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/order/list'}>
                    <ReactSVG src={graphIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/appointments'}>
                    <ReactSVG src={appointmentsIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/list'}>
                    <ReactSVG src={enquiriesIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/list'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/users'}>
                    <ReactSVG src={usersIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/settings'}>
                    <ReactSVG src={bookmarkIcon}/>
                </NavLink>
            </li>


        </StyledMenu>
    );
};

export default Menu;
