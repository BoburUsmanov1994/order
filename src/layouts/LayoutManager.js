import React from 'react';
import {withRouter} from "react-router-dom";
import OrderLayout from "./order";
import AuthLayout from "./auth";
import ErrorLayout from "./error";
import ForbiddenLayout from "./403";
import NotFoundLayout from "./404";

const LayoutManager = (props) => {

    const getLayout = (pathname) => {
        if (pathname === '/') {
            return 'order'
        }
        if (/^\/auth(?=\/|$)/i.test(pathname)) {
            return 'auth'
        }
        if (/^\/error(?=\/|$)/i.test(pathname)) {
            return 'error'
        }
        return 'order';
    }

    const getLayouts = () => {
        return {
            order: OrderLayout,
            auth: AuthLayout,
            403: ForbiddenLayout,
            404: NotFoundLayout,
            error: ErrorLayout
        }
    }

    const {children, location: {pathname}} = props;
    const Layout = getLayouts()[getLayout(pathname)];

    return (
        <Layout>
            {children}
        </Layout>
    );
};

export default withRouter(LayoutManager);