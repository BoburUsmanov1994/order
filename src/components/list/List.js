import React,{useState} from 'react';
import styled from "styled-components";
import {isEqual} from "lodash";
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
  font-size: 20px;
  color: #C6C6C6;
  font-weight: 700;
  margin-bottom: 20px;
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
const List = ({items = [],...props}) => {
    const [active,setActive] = useState(null);
    return (
        <StyledList {...props}>
            {items && items.map(({id,name},index) =>  <li className={classNames({active:isEqual(id,active)})} key={id} onClick={() => setActive(id)}>{`${index+1}. ${name}`}</li>) }
        </StyledList>
    );
};

export default List;
