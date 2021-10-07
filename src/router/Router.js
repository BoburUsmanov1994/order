import React from 'react';
import {BrowserRouter as WebRouter, Route, Switch,Redirect} from "react-router-dom";
import LayoutManager from "../layouts/LayoutManager";
import HomePage from "../modules/order/pages/HomePage";
import CreateOrderPage from "../modules/order/pages/CreateOrderPage";
import OrderListPage from "../modules/order/pages/OrderListPage";
import RegionPage from "../modules/order/pages/RegionPage";
import NotFoundPage from "../modules/order/pages/NotFoundPage";
import ForbiddenPage from "../modules/order/pages/ForbiddenPage";

const Router = () => {
    return (
        <WebRouter>
            <LayoutManager>
                <Switch>
                    <Route path={'/'} exact component={HomePage}/>
                    <Route path={'/region'} exact component={RegionPage}/>
                    <Route path={'/order/create'} exact component={CreateOrderPage}/>
                    <Route path={'/order/list'} exact component={OrderListPage}/>
                    <Route path={'/403'} exact component={ForbiddenPage} />
                    <Route path={'/404'} exact component={NotFoundPage} />
                    <Route path={'*'}>
                        <Redirect to={'/404'} />
                    </Route>
                </Switch>
            </LayoutManager>
        </WebRouter>
    );
};

export default Router;
