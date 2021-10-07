import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import Menu from "../menu";
import {ReactSVG} from "react-svg";
import settingsIcon from "../../assets/images/icons/settings.svg";
import exitIcon from "../../assets/images/icons/exit.svg";

const StyledSidebar = styled.div`
  width: 77px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid #E5E5E5;
  z-index: 99;
  background-color: #fff;

  .sidebar {
    &__mvd {
      color: #707070;
      padding-left: 14px;
      font-size: 24px;
      margin-top: 25px;
      position: relative;

      &:after {
        position: absolute;
        content: "";
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #FFA617;
        bottom: 10px;
        right: 8px
      }
    }

    &__bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
      flex-direction: column;
      a{
        margin-bottom: 20px;
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
`;
const Sidebar = (props) => {
    return (
        <StyledSidebar {...props}>
            <div className="sidebar__mvd">mvd</div>
            <Menu/>
            <div className="sidebar__bottom">
                <NavLink to={'/settings'}>
                    <ReactSVG src={settingsIcon}/>
                </NavLink>
                <NavLink to={'/settings'}>
                    <ReactSVG src={exitIcon}/>
                </NavLink>
            </div>
        </StyledSidebar>
    );
};

export default Sidebar;
