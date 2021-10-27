import React, {useEffect} from 'react';
import {Col, Row} from "react-grid-system";
import {connect} from "react-redux";
import {get} from "lodash";
import {withRouter} from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ApiActions from "../../../services/api/Actions";
import UserScheme from "../../../schema/UserScheme";
import ContentLoader from "../../../components/loader/ContentLoader";
import Normalizer from "../../../services/normalizer";
import ProfileInfo from "../../../components/profile-info/ProfileInfo";

const UserViewContainer = ({history, id, getOneUser, entities, user, isFetched}) => {
    useEffect(() => {
        getOneUser({id});
    }, [id]);
    user = Normalizer.Denormalize(user, UserScheme, entities);
    console.log(user);
    return (
        <>{isFetched ?
            <><Row className={'mb-32'}>
                <Col xs={12}>
                    <hr/>
                </Col>
            </Row>
                <Row>
                    <Col xs={12}>
                        <ProfileInfo name={get(user,'name','-')} position={get(user,'position','-')} email={get(user,'email','-')} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Tabs>
                            <TabList className={'mt-24 mb-24'}>
                                <Tab>Шахский маълумотлар</Tab>
                                <Tab>Ордерлар</Tab>
                                <Tab>Содир этганлар</Tab>
                                <Tab>Жабрланганлар</Tab>
                                <Tab>Оғир вазиятлар</Tab>
                            </TabList>

                            <TabPanel>
                                <h2>Any content 1</h2>
                            </TabPanel>
                            <TabPanel>
                                <h2>Any content 2</h2>
                            </TabPanel>
                        </Tabs>
                    </Col>
                </Row>
            </> : <ContentLoader/>
        }
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        user: get(state, 'normalizer.data.get-one-user.result.users', {}),
        isFetched: get(state, 'normalizer.data.get-one-user.isFetched', false),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getOneUser: ({id}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/user/${id}`,
                config: {
                    params: {},
                },
                scheme: {users: UserScheme},
                storeName: 'get-one-user',
                entityName: 'user',
            },
        }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserViewContainer));
