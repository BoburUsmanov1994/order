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
  padding-top: 10px;
  height: 84vh;
  overflow-y: auto;
  padding-bottom: 10px;
  text-align: center;
  overflow-x: hidden;
  border-bottom: 1px solid #E5E5E5;
  li{
    margin-bottom: 25px;
    position: relative;
    .hover{
      position: absolute;
      left: 100%;
      z-index: 9999;
    }
    a.active{
      position: relative;
      &:after{
        position: absolute;
        content:"";
        height: 30px;
        width: 6px;
        border-radius: 10px;
        background-color: #FFA101;
        right: -40px;
        z-index: 9;
        top: -4px;
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
            <li title={'dashboard'}>
                <NavLink to={'/'} exact>
                    <ReactSVG src={dashboardIcon}/>
                </NavLink>
            </li>
            <li title={'orders'}>
                <NavLink to={'/order/list'}>
                    <ReactSVG src={appointmentsIcon}/>
                </NavLink>
            </li>

            <li title={'users'}>
                <NavLink to={'/users'}   >
                    <ReactSVG src={usersIcon}/>
                </NavLink>
            </li>
            <li title={'victims'}>
                <NavLink to={'/victim/list'}>
                    <ReactSVG src={usersIcon}/>
                </NavLink>
            </li>
            <li title={'violents'}>
                <NavLink to={'/violent/list'}>
                    <ReactSVG src={usersIcon}/>
                </NavLink>
            </li>

            <li title={'regions'}>
                <NavLink to={'/regions'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li title={'districts'}>
                <NavLink to={'/districts'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/neighborhoods'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/ranks'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/account-roles'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/positions'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/account-status'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/status-order'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/person-violence'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/working-place'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/violence-type'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/restrictions-type'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/state-violence'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/social-status'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/send-preparation'}>
                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/reason-violence'}>

                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/criminal-case'}>

                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/criminal-codex'}>

                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/administrative'}>

                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/administrative-codex'}>

                    <ReactSVG src={clipboardIcon}/>
                </NavLink>
            </li>
        </StyledMenu>
    );
};

export default Menu;
