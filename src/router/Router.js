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
import ViolentViewPage from "../modules/order/pages/ViolentViewPage";
import HasAccess from "../services/auth/HasAccess";
import config from "../config";
import DynamicFilterPage from "../modules/order/pages/DynamicFilterPage";

const Router = () => {
    return (
        <WebRouter>
            <AuthLoader>
                <LayoutManager>
                    <IsAuth>
                        <HasAccess>
                            {({userCan}) => <Switch>
                                <Route path={'/'} exact component={HomePage}/>
                                <Route path={'/region/:id'} exact
                                       render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN]) ?
                                           <RegionPage/> : <ForbiddenPage/>}/>
                                <Route path={'/users'} exact
                                       render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN]) ?
                                           <UsersPage/> : <ForbiddenPage/>}/>
                                <Route path={'/user/create'} exact  render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN]) ?
                                    <UserCreatePage/> : <ForbiddenPage/>}/>
                                <Route path={'/user/update/:id'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN]) ?
                                    <UserUpdatePage/> : <ForbiddenPage/>} />
                                <Route path={'/user/view/:id'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN]) ?
                                    <UserViewPage/> : <ForbiddenPage/>} />
                                <Route path={'/order/create'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN,config.ROLES.USER]) ?
                                    <OrderCreatePage/> : <ForbiddenPage/>} />
                                <Route path={'/order/update/:id'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN,config.ROLES.USER]) ?
                                    <OrderUpdatePage/> : <ForbiddenPage/>} />
                                <Route path={'/order/list'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN,config.ROLES.USER]) ?
                                    <OrderListPage/> : <ForbiddenPage/>} />
                                <Route path={'/order/attach/victim/:id'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN,config.ROLES.USER]) ?
                                    <AttachVictimToOrderPage/> : <ForbiddenPage/>} />
                                <Route path={'/order/attach/violent/:id'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN,config.ROLES.USER]) ?
                                    <AttachViolentToOrderPage/> : <ForbiddenPage/>} />
                                <Route path={'/order/view/:id'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN,config.ROLES.USER]) ?
                                    <OrderViewPage/> : <ForbiddenPage/>} />
                                <Route path={'/victim/list'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN,config.ROLES.USER]) ?
                                    <VictimsPage/> : <ForbiddenPage/>} />
                                <Route path={'/victim/update/:id'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN,config.ROLES.USER]) ?
                                    <VictimUpdatePage/> : <ForbiddenPage/>} />
                                <Route path={'/victim/view/:id'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN,config.ROLES.USER]) ?
                                    <VictimViewPage/> : <ForbiddenPage/>} />
                                <Route path={'/violent/list'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN,config.ROLES.USER]) ?
                                    <ViolentsPage/> : <ForbiddenPage/>} />
                                <Route path={'/violent/view/:id'} exact render={() => userCan([config.ROLES.ADMIN, config.ROLES.REGION_ADMIN,config.ROLES.USER]) ?
                                    <ViolentViewPage/> : <ForbiddenPage/>} />
                                <Route path={'/regions'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <RegionsPage/> : <ForbiddenPage/>} />
                                <Route path={'/districts'} exact render={() => userCan([config.ROLES.ADMIN,config.ROLES.REGION_ADMIN]) ?
                                    <DistrictsPage/> : <ForbiddenPage/>} />
                                <Route path={'/neighborhoods'} exact render={() => userCan([config.ROLES.ADMIN,config.ROLES.REGION_ADMIN,config.ROLES.USER]) ?
                                    <NeighborhoodsPage/> : <ForbiddenPage/>} />
                                <Route path={'/ranks'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <RanksPage/> : <ForbiddenPage/>} />
                                <Route path={'/account-roles'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <AccountRolesPage/> : <ForbiddenPage/>}  />
                                <Route path={'/positions'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <PositionPage/> : <ForbiddenPage/>}  />
                                <Route path={'/account-status'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <AccountStatusPage/> : <ForbiddenPage/>} />
                                <Route path={'/status-order'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <StatusOrderPage/> : <ForbiddenPage/>} />
                                <Route path={'/person-violence'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <PersonViolencePage/> : <ForbiddenPage/>} />
                                <Route path={'/working-place'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <WorkingPlacePage/> : <ForbiddenPage/>} />
                                <Route path={'/violence-type'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <ViolenceTypePage/> : <ForbiddenPage/>} />
                                <Route path={'/restrictions-type'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <RestrictionsTypePage/> : <ForbiddenPage/>} />
                                <Route path={'/state-violence'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <StateViolencePage/> : <ForbiddenPage/>} />
                                <Route path={'/social-status'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <SocialStatusPage/> : <ForbiddenPage/>} />
                                <Route path={'/send-preparation'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <SendPreparationPage/> : <ForbiddenPage/>} />
                                <Route path={'/reason-violence'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <ReasonViolencePage/> : <ForbiddenPage/>} />
                                <Route path={'/criminal-case'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <CriminalCasePage/> : <ForbiddenPage/>} />
                                <Route path={'/criminal-codex'} render={() => userCan([config.ROLES.ADMIN]) ?
                                    <CriminalCodexPage/> : <ForbiddenPage/>} exact />
                                <Route path={'/administrative'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <AdministrativePage/> : <ForbiddenPage/>} />
                                <Route path={'/administrative-codex'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <AdministrativeCodexPage/> : <ForbiddenPage/>} />
                                <Route path={'/citizenship'} exact  render={() => userCan([config.ROLES.ADMIN]) ?
                                    <CitizenshipPage/> : <ForbiddenPage/>} />
                                <Route path={'/ages'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <AgesPage/> : <ForbiddenPage/>} />
                                <Route path={'/education'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <EducationPage/> : <ForbiddenPage/>} />
                                <Route path={'/family-position'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <FamilyPositionPage/> : <ForbiddenPage/>} />
                                <Route path={'/conditionperson'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <PersonConditionPage/> : <ForbiddenPage/>} />
                                <Route path={'/guardianship'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <GuardianshipPage/> : <ForbiddenPage/>} />
                                <Route path={'/basis-termination'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <BasisTerminationPage/> : <ForbiddenPage/>}  />
                                <Route path={'/action-person-violence'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <ActionPersonViolencePage/> : <ForbiddenPage/>} />
                                <Route path={'/condition-person-violence'} exact
                                       render={() => userCan([config.ROLES.ADMIN]) ?
                                           <ConditionPersonViolencePage/> : <ForbiddenPage/>} />
                                <Route path={'/occured-repetation'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <OccuredRepetitionPage/> : <ForbiddenPage/>} />
                                <Route path={'/restrictions-of-type'} exact component={RestrictionOfTypePage}/>
                                <Route path={'/behavior'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <BehaviorPage/> : <ForbiddenPage/>} />
                                <Route path={'/result-order'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <ResultOrderPage/> : <ForbiddenPage/>} />
                                <Route path={'/filter'} exact render={() => userCan([config.ROLES.ADMIN]) ?
                                    <DynamicFilterPage/> : <ForbiddenPage/>} />
                                <Route path={'/logout'} exact component={LogoutPage}/>
                                <Route path={'/403'} exact component={ForbiddenPage}/>
                                <Route path={'/404'} exact component={NotFoundPage}/>
                                <Route path={'*'}>
                                    <Redirect to={'/404'}/>
                                </Route>
                            </Switch>}
                        </HasAccess>

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
