import React from 'react';
import styled from "styled-components";
import {range,includes} from "lodash";
import counter from "../../assets/images/counter.png";
import classNames from "classnames";

const StyledStepNav = styled.div`
  ul {
    display: flex;
    align-items: center;
    padding-top: 25px;
    justify-content: space-between;
    padding-right: 30px;
    padding-bottom: 40px;

    li {
      position: relative;
      width: 25%;
      &:after{
        position: absolute;
        top: 60%;
        width: 100%;
        height: 3px;
        left: 112px;
        border-bottom: 3px dashed #A3A3A3;
        content:""
      }
      &:last-child{
        &:after{
          display: none;
        }
      }
      p {
        font-size: 15px;
        color: #7E7E7E;
        margin-bottom: 20px;
      }

      .step {
        width: 112px;
        height: 112px;
        border-radius: 50%;
        background-color: #EBEBEB;
        color: #fff;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 57px;
        font-weight: 700;
        position: relative;
        &:after{
          position: absolute;
          width: 120%;
          height: 120%;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          background-image: url(${counter});
        }
      }
      &.active{
        &:after{
          border-color: #21D59B;
        }
        .step{
          background-color: #21D59B;
          &:after{
            content:"";
          }
        }
      }
    }
  }
`;
const StepNav = ({step = 1,...props}) => {
    return (
        <StyledStepNav {...props}>
            <ul>
                <li className={classNames({active:includes(range(0,step+1),1)})}>
                    <p>Биринчи қадам</p>
                    <div className={'step'}>1</div>
                </li>
                <li className={classNames({active:includes(range(0,step+1),2)})}>
                    <p>Иккинчи қадам</p>
                    <div className={'step'}>2</div>
                </li>
                <li className={classNames({active:includes(range(0,step+1),3)})}>
                    <p>Учинчи қадам</p>
                    <div className={'step'}>3</div>
                </li>
             <li className={classNames({active:includes(range(0,step+1),4)})}>
                    <p>Тўртинчи қадам</p>
                    <div className={'step'}>4</div>
                </li>
            </ul>
        </StyledStepNav>
    );
};

export default StepNav;
