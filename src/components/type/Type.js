import React from 'react';
import styled from "styled-components";
import {capitalize,get,isEqual} from "lodash";
import imgSexual from "../../assets/images/sexual.svg";
import imgIllness from "../../assets/images/illness.svg";
import imgAnger from "../../assets/images/anger.svg";
import imgCoin from "../../assets/images/coin.svg";
import imgPower from "../../assets/images/empowerment.svg";
import imgStop from "../../assets/images/stop-violence-2.svg";
import Badge from "../badge/Badge";


const StyledType = styled.div`
  display: flex;
  align-items: center;

  .type {
    &__left {
      margin-right: 20px;
    }

    &__right {
      h3 {
        font-size: 14px;
      }
      &_bottom {
        display: flex;
        align-items: center;
        .column{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          //margin-bottom: 10px;
        }
        h2 {
          color: #322A7D;
          font-size: 30px;
          margin-right: 5px;
          font-weight: 700;
        }
        .bold{
          font-weight: 700;
          color: #322A7D;
        }
      }
    }
  }
`;
const Type = ({title = '',count = 0, percent = 0,increase=false,decrease=false, ...props}) => {
    return (
        <StyledType {...props}>
            <div className="type__left">
                {isEqual(title,'жинсий зўравонлик') && <img src={imgSexual} alt=""/>}
                {isEqual(title,'руҳий зўравонлик') && <img src={imgIllness} alt=""/>}
                {isEqual(title,'тазйиқ') && <img src={imgAnger} alt=""/>}
                {isEqual(title,'иқтисодий зўравонлик') && <img src={imgCoin} alt=""/>}
                {isEqual(title,'жисмоний зўровонлик') && <img src={imgPower} alt=""/>}
                {isEqual(title,'зўравонлик') && <img src={imgStop} alt=""/>}
            </div>
            <div className={'type__right'}>
                <h3>{capitalize(title)}</h3>
                <div className="type__right_bottom">
                    <h2>
                        {count}
                    </h2>
                    <div className={'column'}>
                        {/*<div className="bold">минг</div>*/}
                        <Badge percent={percent} success increase={increase} decrease={decrease}/>
                    </div>
                </div>
            </div>
        </StyledType>
    );
};

export default Type;
