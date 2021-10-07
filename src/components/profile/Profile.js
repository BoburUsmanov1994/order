import React from 'react';
import styled from "styled-components";
import avatarSvg from "../../assets/images/avatar.svg";
import chevron from "../../assets/images/icons/chevron-down.svg"

const StyledProfile = styled.div`
display: flex;
  align-items: center;
  cursor: pointer;
  span{
    margin-left: 12px;
    margin-right: 6px;
    color: #131523;
    font-size: 14px;
    font-family: Poppins;
  }
`;
const Profile = (props) => {
    return (
        <StyledProfile {...props}>
            <img src={avatarSvg}/>
            <span>Turapov Avazbek</span>
            <img src={chevron} alt=""/>
        </StyledProfile>
    );
};

export default Profile;
