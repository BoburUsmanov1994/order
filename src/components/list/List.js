import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {isEqual,get} from "lodash";
import classNames from "classnames";

const StyledList = styled.ul`
  padding-top: 30px;
  padding-right: 30px;
  height: 50vh;
  overflow-y: auto;
  display: inline-flex;
  flex-direction: column;

  /* width */
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #F5F5F5;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #C4C4C4;
    border-radius: 6px;
  }
li{
  font-size: 16px;
  color: #C6C6C6;
  font-weight: 700;
  margin-bottom: 10px;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  display: inline-block;
  padding-bottom: 10px;
  &:last-child{
    margin-bottom: 0;
  }
  &.active{
    color: #131523;
    border-bottom-color: #DE1010;
  }
}
`;
const List = ({items = [],setOrderFilter=()=>{},orderFilter={},active=null,...props}) => {
    return (
        <StyledList {...props}>
            {items && items.map(({_id,name},index) =>  <li className={classNames({active:isEqual(_id,active)})} key={_id} onClick={() => setOrderFilter(_id)}>{`${index+1}. ${name}`}</li>) }
        </StyledList>
    );
};

export default List;
