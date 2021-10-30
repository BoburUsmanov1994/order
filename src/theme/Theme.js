import React from 'react';
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {useSelector} from "react-redux";
import {get} from "lodash";
import Wrapper from "../components/wrapper";
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-tabs/style/react-tabs.css';
import storage from "../services/local-storage";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6, p, ul {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  body {
    color: #707070;
    font-size: 16px;
    line-height: 1.45;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
    font-family: 'Ubuntu', sans-serif;
  }
  .img-fluid{
    max-width: 100%;
    height: auto;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .text-danger{
    color: #EF142F;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .mt-24{
    margin-top: 24px;
  }
  .mt-16{
    margin-top: 16px;
  }
  .mb-16{
    margin-bottom: 16px;
  }
  .mb-32{
    margin-bottom: 32px;
  }
  .mb-8{
    margin-bottom: 8px;
  }
  .ml-16{
    margin-left: 16px;
  }
  .ml-48{
    margin-left: 48px;
  }
  .mr-8{
    margin-right: 8px;
  }
  .mr-16{
    margin-right: 16px;
  }
  .mb-24{
    margin-bottom: 24px;
  }
  .mb-48{
    margin-bottom: 48px;
  }
  .mb-100{
    margin-bottom: 100px;
  }
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
  .hasBorderRight{
    border-right:1px solid #707070;
    padding-right: 30px !important;
  }
.react-confirm-alert-body{
  text-align: center;
  h1{
    font-size: 24px !important;
  }
  .react-confirm-alert-button-group{
    justify-content: center;
  
    button{
      font-size: 16px;
      &:first-child{
        background-color: #F76652;
      }
      :last-child{
        background-color: #2BCC71;
      }
    }
  }
}
.react-tabs__tab{
  border:unset;
  bottom: unset;
  margin-right: 35px;
  padding-left: 0px;
  padding-right: 0px;
}
  .react-tabs__tab:focus{
    box-shadow: unset;
  }
  .react-tabs__tab.react-tabs__tab--selected{
    border-bottom: 1px solid #DE1010;
  }
  @media print{@page {size: landscape}}
  
`;
const Theme = ({children}) => {
    const open = useSelector(state => get(state,'order.open',storage.get('open') ?? 'open'))
    return (
        <ThemeProvider theme={{open}}>
            <GlobalStyles/>
            <Wrapper>
                {children}
            </Wrapper>
        </ThemeProvider>
    );
};

export default Theme;
