import React from 'react';
import {BrowserRouter as WebRouter, Redirect, Route, Switch} from "react-router-dom";
import LayoutManager from "../layouts/LayoutManager";
import HomePage from "../modules/order/pages/HomePage";
import AttachVictimToOrderPage from "../modules/order/pages/AttachVictimToOrderPage";
import OrderListPage from "../modules/order/pages/OrderListPage";
import RegionPage from "../modules/order/pages/RegionPage";
import NotFoundPage from "../modules/order/pages/NotFoundPage";
import ForbiddenPage from "../modules/order/pages/ForbiddenPage";
import AuthLoader from "../services/auth/AuthLoader";
import IsAuth from "../services/auth/IsAuth";
import IsGuest from "../services/auth/IsGuest";
import LoginPage from "../modules/auth/pages/LoginPage";
import LogoutPage from "../modules/auth/pages/LogoutPage"
import RegionsPage from "../modules/order/pages/RegionsPage";
import DistrictsPage from "../modules/order/pages/DistrictsPage";
import NeighborhoodsPage from "../modules/order/pages/NeighborhoodsPage";
import RanksPage from "../modules/order/pages/RanksPage";
import AccountRolesPage from "../modules/order/pages/AccountRolesPage";
import PositionPage from "../modules/order/pages/PositionPage";
import AccountStatusPage from "../modules/order/pages/AccountStatusPage";
import StatusOrderPage from "../modules/order/pages/StatusOrderPage";
import PersonViolencePage from "../modules/order/pages/PersonViolencePage";
import WorkingPlacePage from "../modules/order/pages/WorkingPlacePage";
import ViolenceTypePage from "../modules/order/pages/ViolenceTypePage";
import RestrictionsTypePage from "../modules/order/pages/RestrictionsTypePage";
import StateViolencePage from "../modules/order/pages/StateViolencePage";
import SocialStatusPage from "../modules/order/pages/SocialStatusPage";
import SendPreparationPage from "../modules/order/pages/SendPreparationPage";
import UsersPage from "../modules/order/pages/UsersPage";
import UserCreatePage from "../modules/order/pages/UserCreatePage";
import UserUpdatePage from "../modules/order/pages/UserUpdatePage";
import UserViewPage from "../modules/order/pages/UserViewPage";
import OrderCreatePage from "../modules/order/pages/OrderCreatePage";
import OrderUpdatePage from "../modules/order/pages/OrderUpdatePage";
import VictimsPage from "../modules/order/pages/VictimsPage";
import AttachViolentToOrderPage from "../modules/order/pages/AttachViolentToOrderPage";
import ReasonViolencePage from "../modules/order/pages/ReasonViolencePage";
import CriminalCasePage from "../modules/order/pages/CriminalCasePage";
import CriminalCodexPage from "../modules/order/pages/CriminalCodexPage";
import AdministrativePage from "../modules/order/pages/AdministrativePage";
import AdministrativeCodexPage from "../modules/order/pages/AdministrativeCodexPage";
import ViolentsPage from "../modules/order/pages/ViolentsPage";
import VictimUpdatePage from "../modules/order/pages/VictimUpdatePage";
import OrderViewPage from "../modules/order/pages/OrderViewPage";
import CitizenshipPage from "../modules/order/pages/CitizenshipPage";
import AgesPage from "../modules/order/pages/AgesPage";
import EducationPage from "../modules/order/pages/EducationPage";
import FamilyPositionPage from "../modules/order/pages/FamilyPositionPage";
import PersonConditionPage from "../modules/order/pages/PersonConditionPage";
import GuardianshipPage from "../modules/order/pages/GuardianshipPage";
import BasisTerminationPage from "../modules/order/pages/BasisTerminationPage";
import ActionPersonViolencePage from "../modules/order/pages/ActionPersonViolencePage";
import ConditionPersonViolencePage from "../modules/order/pages/ConditionPersonViolencePage";
import OccuredRepetitionPage from "../modules/order/pages/OccuredRepetitionPage";
import RestrictionOfTypePage from "../modules/order/pages/RestrictionOfTypePage";
import BehaviorPage from "../modules/order/pages/BehaviorPage";
import ResultOrderPage from "../modules/order/pages/ResultOrderpage";
import VictimViewPage from "../modules/order/pages/VictimViewPage";

const Router = () => {
    return (
        <WebRouter>
            <AuthLoader>
                <LayoutManager>
                    <IsAuth>
                        <Switch>
                            <Route path={'/'} exact component={HomePage}/>
                            <Route path={'/region/:id'} exact component={RegionPage}/>
                            <Route path={'/users'} exact component={UsersPage}/>
                            <Route path={'/user/create'} exact component={UserCreatePage}/>
                            <Route path={'/user/update/:id'} exact component={UserUpdatePage}/>
                            <Route path={'/user/view/:id'} exact component={UserViewPage}/>
                            <Route path={'/order/create'} exact component={OrderCreatePage}/>
                            <Route path={'/order/update/:id'} exact component={OrderUpdatePage}/>
                            <Route path={'/order/list'} exact component={OrderListPage}/>
                            <Route path={'/order/attach/victim/:id'} exact component={AttachVictimToOrderPage}/>
                            <Route path={'/order/attach/violent/:id'} exact component={AttachViolentToOrderPage}/>
                            <Route path={'/order/view/:id'} exact component={OrderViewPage}/>
                            <Route path={'/victim/list'} exact component={VictimsPage}/>
                            <Route path={'/victim/update/:id'} exact component={VictimUpdatePage}/>
                            <Route path={'/victim/view/:id'} exact component={VictimViewPage}/>
                            <Route path={'/violent/list'} exact component={ViolentsPage}/>
                            <Route path={'/regions'} exact component={RegionsPage}/>
                            <Route path={'/districts'} exact component={DistrictsPage}/>
                            <Route path={'/neighborhoods'} exact component={NeighborhoodsPage}/>
                            <Route path={'/ranks'} exact component={RanksPage}/>
                            <Route path={'/account-roles'} exact component={AccountRolesPage}/>
                            <Route path={'/positions'} exact component={PositionPage}/>
                            <Route path={'/account-status'} exact component={AccountStatusPage}/>
                            <Route path={'/status-order'} exact component={StatusOrderPage}/>
                            <Route path={'/person-violence'} exact component={PersonViolencePage}/>
                            <Route path={'/working-place'} exact component={WorkingPlacePage}/>
                            <Route path={'/violence-type'} exact component={ViolenceTypePage}/>
                            <Route path={'/restrictions-type'} exact component={RestrictionsTypePage}/>
                            <Route path={'/state-violence'} exact component={StateViolencePage}/>
                            <Route path={'/social-status'} exact component={SocialStatusPage}/>
                            <Route path={'/send-preparation'} exact component={SendPreparationPage}/>
                            <Route path={'/reason-violence'} exact component={ReasonViolencePage}/>
                            <Route path={'/criminal-case'} exact component={CriminalCasePage}/>
                            <Route path={'/criminal-codex'} exact component={CriminalCodexPage}/>
                            <Route path={'/administrative'} exact component={AdministrativePage}/>
                            <Route path={'/administrative-codex'} exact component={AdministrativeCodexPage}/>
                            <Route path={'/citizenship'} exact component={CitizenshipPage}/>
                            <Route path={'/ages'} exact component={AgesPage}/>
                            <Route path={'/education'} exact component={EducationPage}/>
                            <Route path={'/family-position'} exact component={FamilyPositionPage}/>
                            <Route path={'/conditionperson'} exact component={PersonConditionPage}/>
                            <Route path={'/guardianship'} exact component={GuardianshipPage}/>
                            <Route path={'/basis-termination'} exact component={BasisTerminationPage}/>
                            <Route path={'/action-person-violence'} exact component={ActionPersonViolencePage}/>
                            <Route path={'/condition-person-violence'} exact component={ConditionPersonViolencePage}/>
                            <Route path={'/occured-repetation'} exact component={OccuredRepetitionPage}/>
                            <Route path={'/restrictions-of-type'} exact component={RestrictionOfTypePage}/>
                            <Route path={'/behavior'} exact component={BehaviorPage}/>
                            <Route path={'/result-order'} exact component={ResultOrderPage}/>
                            <Route path={'/logout'} exact component={LogoutPage}/>
                            <Route path={'/403'} exact component={ForbiddenPage}/>
                            <Route path={'/404'} exact component={NotFoundPage}/>
                            <Route path={'*'}>
                                <Redirect to={'/404'}/>
                            </Route>
                        </Switch>
                    </IsAuth>
                    <IsGuest>
                        <Switch>
                            <Route path={'/auth'} exact component={LoginPage}/>
                            <Redirect to={'/auth'}/>
                        </Switch>
                    </IsGuest>
                </LayoutManager>
            </AuthLoader>
        </WebRouter>
    );
};

export default Router;
