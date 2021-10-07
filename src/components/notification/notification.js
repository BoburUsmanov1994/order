import React from 'react';
import styled from "styled-components";
import notificationSvg from "../../assets/images/icons/bell.svg";
const StyledNotification = styled.div`
  margin-left: 20px;
  margin-right: 36px;
  position: relative;
  cursor: pointer;
  .count{
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #F0142F;
    top: -4px;
    right: -4px;
    color: #fff;
    font-size: 10px;
    line-height: 1;
    font-family: Poppins;
  }
`;
const Notification = () => {
    return (
        <StyledNotification >
            <img src={notificationSvg} />
            <span className={'count'}>2</span>
        </StyledNotification>
    );
};

export default Notification;
