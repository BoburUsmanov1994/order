import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {get} from "lodash";
import avatarSvg from "../../assets/images/avatar.svg";
import chevron from "../../assets/images/icons/chevron-down.svg";
import userIcon from "../../assets/images/icons/user.png";
import messageIcon from "../../assets/images/icons/envelope-download.png";
import keyIcon from "../../assets/images/icons/key.png";
import settingsIcon from "../../assets/images/icons/settings.png";
import signoutIcon from "../../assets/images/icons/sign-out.png";
import {addDetectClick, removeDetectClick} from "../../utils";

const StyledProfile = styled.div`

  position: relative;

  .user {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  span {
    margin-left: 12px;
    margin-right: 6px;
    color: #131523;
    font-size: 14px;
    font-family: 'Poppins';
  }

  .dropdown {
    position: absolute;
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 13px;
    border: 1px solid #707070;
    right: 0;
    top: 50px;
    width: 250px;
    z-index: 999;
    background-color: #fff;


    &__link {
      padding: 7px 15px;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      transition: 0.3s ease;

      &:hover {
        background-color: #F2F2F2;
      }

      img {
        margin-right: 15px;
      }

      span.text {
        font-family: 'Ubuntu', sans-serif;
        font-size: 15px;
        color: #7E7E7E;
        margin-left: 0;
      }
    }
  }
`;
const Profile = ({profile,...props}) => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        return () => {
            removeDetectClick()
        }
    }, [])
    addDetectClick({setOpen, classNames: ['user', 'user__text', 'user__icon']});
    return (
        <StyledProfile {...props}>
            <div className={'user'} onClick={() => setOpen(open => !open)}>
                <img className={'user__icon'} src={avatarSvg}/>
                <span className={'user__text'}>{get(profile,'email')}</span>
                <img className={'user__icon'} src={chevron} alt=""/>
            </div>
            {open && <div className="dropdown">
                <Link to={'/'} className={'dropdown__link'}>
                    <img src={userIcon} alt=""/>
                    <span className={'text'}>Профиль</span>
                </Link>
                <Link to={'/'} className={'dropdown__link'}>
                    <img src={messageIcon} alt=""/>
                    <span className={'text'}>Хабарларлар</span>
                </Link>
                <Link to={'/'} className={'dropdown__link'}>
                    <img src={keyIcon} alt=""/>
                    <span className={'text'}>Парольни алмаштириш</span>
                </Link>
                <Link to={'/'} className={'dropdown__link'}>
                    <img src={settingsIcon} alt=""/>
                    <span className={'text'}>Созламалар</span>
                </Link>
                <Link to={'/logout'} className={'dropdown__link'}>
                    <img src={signoutIcon} alt=""/>
                    <span className={'text'}>Чиқиш</span>
                </Link>
            </div>}
        </StyledProfile>
    );
};

export default Profile;
