import React from 'react';
import {Container} from 'react-grid-system';
import {connect} from "react-redux";
import {get} from "lodash";
import Sidebar from "../../components/sidebar";
import Content from "../../components/content";
import Header from "../../components/header";


const OrderLayout = ({children,profile}) => {
    return (
        <>
            <Sidebar/>
            <Content>
                <Header profile={profile} />
                <Container fluid>
                    {children}
                </Container>
            </Content>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        profile:get(state,'auth.user',{})
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderLayout);
