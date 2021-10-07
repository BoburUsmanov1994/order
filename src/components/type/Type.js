import React from 'react';
import styled from "styled-components";
import img from "../../assets/images/sexual.svg";
import Badge from "../badge/Badge";
import Flex from "../flex/Flex";

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
          margin-bottom: 10px;
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
const Type = ({title = '',increase=false,decrease=false, ...props}) => {
    return (
        <StyledType {...props}>
            <div className="type__left">
                <img src={img} alt=""/>
            </div>
            <div className={'type__right'}>
                <h3>{title}</h3>
                <div className="type__right_bottom">
                    <h2>
                        2.8
                    </h2>
                    <div className={'column'}>
                        <div className="bold">минг</div>
                        <Badge percent={123} success increase={increase} decrease={decrease}/>
                    </div>
                </div>
            </div>
        </StyledType>
    );
};

export default Type;
