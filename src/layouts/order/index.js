import React from 'react';
import {Container} from 'react-grid-system';
import Sidebar from "../../components/sidebar";
import Content from "../../components/content";
import Header from "../../components/header";

const OrderLayout = ({children}) => {
    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Container fluid>
                    {children}
                </Container>
            </Content>
        </>
    );
};

export default OrderLayout;
