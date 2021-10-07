import React from 'react';
import styled from "styled-components";
import {ReactSVG} from "react-svg";
import searchSvg from "../../assets/images/icons/search.svg";

const StyledSearch = styled.form`
  display: flex;
  align-items: center;
  input{
    border:none;
    outline: none;
    padding: 5px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #5A607F;
  }
  .icon{
    margin-top: 5px;
  }
`;
const Search = ({placeholder = 'Search...', ...props}) => {
    return (
        <StyledSearch {...props}>
            <ReactSVG src={searchSvg} className={'icon'}/>
            <input type="text" placeholder={placeholder}/>
        </StyledSearch>
    );
};

export default Search;
