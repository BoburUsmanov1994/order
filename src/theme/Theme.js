import React from 'react';
import {createGlobalStyle, ThemeProvider} from "styled-components";
import Wrapper from "../components/wrapper";

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

  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
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
`;
const Theme = ({children}) => {
    return (
        <ThemeProvider theme={{dark: false}}>
            <GlobalStyles/>
            <Wrapper>
                {children}
            </Wrapper>
        </ThemeProvider>
    );
};

export default Theme;
