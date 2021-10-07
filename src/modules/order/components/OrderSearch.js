import React,{useState} from 'react';
import styled from "styled-components";
import searchImg from "../../../assets/images/icons/search.svg";

const StyledOrderSearch = styled.form`
  height: 48px;
  min-width: 500px;
  border: 1px solid #BFB7B7;
  border-radius: 27px;
  display: flex;
  align-items: center;
  padding: 15px;
  input{
    width: 100%;
    height: 35px;
    border:none;
    outline: none;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #A0A0A0;
    padding-left: 15px;
  }
  button{
    width: 35px;
    height: 35px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border:none;
    outline: none;
    cursor: pointer;
    margin-left: 10px;
  }
`;
const OrderSearch = (props) => {
    const [str,searchStr] = useState('');
    const submitHandle = (e) => {
        e.preventDefault();
        alert(str)
    }
    return (
        <StyledOrderSearch {...props} onSubmit={submitHandle}>
            <input type="text" value={str} onChange={(e) => searchStr(e.target.value)} placeholder={'Қидириш'}/>
            <button><img src={searchImg} alt=""/></button>
        </StyledOrderSearch>
    );
};

export default OrderSearch;
