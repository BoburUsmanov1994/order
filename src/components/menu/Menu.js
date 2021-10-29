import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {ReactSVG} from "react-svg";
import dashboardIcon from "../../assets/images/icons/dashboard.svg";
import appointmentsIcon from "../../assets/images/icons/appointments.svg";
import clipboardIcon from "../../assets/images/icons/clipboard.svg";
import usersIcon from "../../assets/images/icons/users.svg";
import userIcon from "../../assets/images/icons/user.svg";
import bookmarkIcon from "../../assets/images/icons/bookmark.svg";
import graphIcon from "../../assets/images/icons/graph.svg";
import enqIcon from "../../assets/images/icons/enquiries.svg";
import statisticsIcon from "../../assets/images/icons/statistics.svg";
import MenuParent from "./MenuParent";
import {isEqual} from "lodash";

const StyledMenu = styled.ul`
  height: ${({theme:{open}}) => isEqual(open,'open') ? '80vh' : '84vh'};
  overflow-y: auto;
  padding-bottom: 10px;
  padding-top: 30px;
  //text-align: center;
  overflow-x: hidden;
  border-bottom: 1px solid #E5E5E5;

  li {
    margin-bottom: 10px;
    position: relative;

    a {
      display: flex;
      align-items: center;
      padding-left: 30px;
      padding-right: 15px;
      padding-top: 10px;
      padding-bottom: 10px;
      color: #7E7E7E;

      span.text {
        margin-bottom: 8px;
        font-size: 14px;
        display: ${({theme:{open}})=>isEqual(open,'open') ? 'inline-block' : 'none'};
      }

      svg {
        margin-right: 15px;
      }
    }

    .hover {
      position: absolute;
      left: 100%;
      z-index: 9999;
    }

    a.active {
      position: relative;
      color: #322A7D;
      &:after {
        position: absolute;
        content: "";
        height: 30px;
        width: 6px;
        border-radius: 10px;
        background-color: #FFA101;
        right: -40px;
        z-index: 9;
        top: -4px;
      }

      svg {

        path, rect {
          fill: #322A7D !important;
        }
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
 
  }
  @media screen and (max-width:1600px){
    height: ${({theme:{open}}) => isEqual(open,'open') ? '76vh' : '80vh'};
    li{
      a{
        padding-left: 25px;
      }
    }
  }
`;
const Menu = ({items, ...props}) => {
    return (
        <StyledMenu {...props}>
            <li title={'dashboard'}>
                <NavLink to={'/'} exact>
                    <ReactSVG src={dashboardIcon}/> <span className={'text'}>Асосий</span>
                </NavLink>
            </li>
            <li title={'statistics'}>
                <NavLink to={'/statistics'} exact>
                    <ReactSVG src={graphIcon}/> <span className={'text'}>Статистика ойнаси</span>
                </NavLink>
            </li>
            <li title={'orders'}>
                <NavLink to={'/order/list'}>
                    <ReactSVG src={appointmentsIcon}/> <span className={'text'}>Ҳимоя ордерлари</span>
                </NavLink>
            </li>


            <li title={'filter'}>
                <NavLink to={'/filter'}>
                    <ReactSVG src={appointmentsIcon}/> <span className={'text'}>Филтер</span>
                </NavLink>
            </li>

            <MenuParent icon={enqIcon} name={'Ордер берилган ва олган \n' +
            'Фуқаролар рўйхати '}>
                <li title={'victims'}>
                    <NavLink to={'/victim/list'}>
                        <ReactSVG src={usersIcon}/><span className={'text'}>Тазйиқ ва зўравонликдан жабрланган хотин-қизлар</span>
                    </NavLink>
                </li>
                <li title={'violents'}>
                    <NavLink to={'/violent/list'}>
                        <ReactSVG src={usersIcon}/><span className={'text'}>Тазйиқ ва зўравонлик содир этган шахс</span>
                    </NavLink>
                </li>
            </MenuParent>

            <MenuParent icon={usersIcon} name={'Ходимлар '}>
                <li title={'users'}>
                    <NavLink to={'/users'}>
                        <ReactSVG src={usersIcon}/><span className={'text'}>Ходимлар рўйхати</span>
                    </NavLink>
                </li>
                <li title={'users'}>
                    <NavLink to={'/ranks'}>
                        <ReactSVG src={usersIcon}/><span className={'text'}>Унвонлар рўйхати</span>
                    </NavLink>
                </li>
                <li title={'users'}>
                    <NavLink to={'/account-roles'}>
                        <ReactSVG src={usersIcon}/><span className={'text'}>Фойдаланувчининг ролари</span>
                    </NavLink>
                </li>
                <li title={'users'}>
                    <NavLink to={'/account-status'}>
                        <ReactSVG src={usersIcon}/><span className={'text'}>Фойдаланувчининг статус</span>
                    </NavLink>
                </li>
            </MenuParent>
            <MenuParent icon={enqIcon} name={'Ҳисоботлар'}>
                <li title={'users'}>
                    <NavLink to={'/users'}>
                        <ReactSVG src={statisticsIcon}/><span className={'text'}>Ҳисобот - 1</span>
                    </NavLink>
                </li>
            </MenuParent>
            <MenuParent icon={bookmarkIcon} name={'Умумий маълумотлар'}>
                <li title={'regions'}>
                    <NavLink to={'/regions'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Вилоятлар</span>
                    </NavLink>
                </li>
                <li title={'districts'}>
                    <NavLink to={'/districts'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Туманлар</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/neighborhoods'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Маҳаллалар</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/citizenship'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Фуқаролиги</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/ages'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Ёши</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/education'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Маълумоти</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/family-position'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Оилавий аҳволи</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/social-status'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Ижтимоий аҳволи</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/conditionperson'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Шахснинг ҳолати бўйича</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/working-place'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Жабрланган шахснинг бандлиги</span>

                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/violence-type'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}> Тазйиқ ва зўравонлик турлари</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/restrictions-type'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}> Ҳимоя ордери бериш учун асос бўлган ҳужжатлар</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/guardianship'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Вояга етмаган ёки суд томондан муомалага лаёқатсиз деб топилган тазйиқ ва зўравонликдан жабрланувчиларга нисбатан ҳимоя ордери кимлар иштирокида расмийлаштириб берилган</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/restrictions-type'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}> Белгиланган чекловлар</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/status-order'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Ҳимоя ордери муддати узайтирилганлиги</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/send-preparation'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Тазйиқ ва зўравонликдан жабрланувчиларга ёрдам кўрсатиш бўйича махсус марказларга жойлаштириш</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/basis-termination'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Ҳимоя ордерини тугатиш асослари</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/person-violence'}>

                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Тазйиқ ёки зўравонлик содир этган шахс</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/state-violence'}>

                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Тазйиқ ва зўравонлик содир этган ҳолати</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/action-person-violence'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Тазйиқ ва зўравонлик ҳолатлари ким томондан содир этилганлиги</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/reason-violence'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Зўравонлик содир этиш сабабалари</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/condition-person-violence'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Тазйиқ ва зўравонлик содир этган шахс ҳолати</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/occured-repetation'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Тазйиқ ва зўравонлик ҳолатларини содир этилганлигини такрорийлиги</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/criminal-case'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Ушбу ҳолат бўйича ҳимоя ордерини бериш билан биргаликда жиноят иши қўзғатилганлиги</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/criminal-codex'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Жиноят кодекси моддалари</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/administrative'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Ушбу ҳолат бўйича ҳимоя ордерини бериш билан биргаликда маъмурий жавобгарликка тортилганлиги</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/administrative-codex'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Маъмурий кодекси моддалари</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/restrictions-of-type'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Тазйиқ ўтказган ёки зўравонлик содир этган ёки содир этишга мойил бўлган шахсга белгиланган чекловлар</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/behavior'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Тазйиқ ёки зўравонлик содир этган, содир этишга мойил бўлган шахсларни ҳулқ-атворини тузатиш дастуридан ўтиш учун юборилган</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/result-order'}>
                        <ReactSVG src={clipboardIcon}/><span className={'text'}>Ҳимоя ордери бериш натижаси</span>
                    </NavLink>
                </li>
            </MenuParent>
        </StyledMenu>
    );
};

export default Menu;
