import React, {useEffect} from 'react';
import {Col, Row} from "react-grid-system";
import {connect} from "react-redux";
import {get} from "lodash";
import {withRouter} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import ApiActions from "../../../services/api/Actions";
import UserScheme from "../../../schema/UserScheme";
import ContentLoader from "../../../components/loader/ContentLoader";
import Normalizer from "../../../services/normalizer";
import ProfileInfo from "../../../components/profile-info/ProfileInfo";
import Box from "../../../components/box";
import Label from "../../../components/elements/label";
import Title from "../../../components/title";

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
                        <ProfileInfo createdAt={get(user,'createdAt','-')} status={get(user,'accountstatus.name','-')} role={get(user,'accountrole.name','-')} name={get(user,'name','-')} position={get(user,'position','-')} email={get(user,'email','-')} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Tabs>
                            <TabList className={'mt-24 mb-24'}>
                                <Tab>Шахский маълумотлар</Tab>
                                <Tab>Ордерлар</Tab>
                            </TabList>

                            <TabPanel>
                                <Box>
                                    <Row>
                                        <Col xs={4} className={'mb-16'}>
                                            <Label>Фамилия</Label>
                                            <Title md>
                                                {get(user,'secondname','-')}
                                            </Title>
                                        </Col>
                                        <Col xs={4} className={'mb-16'}>
                                            <Label>Исми</Label>
                                            <Title md>
                                                {get(user,'name','-')}
                                            </Title>
                                        </Col>
                                        <Col xs={4} className={'mb-16'}>
                                            <Label>Отасининг исми</Label>
                                            <Title md>
                                                {get(user,'middlename','-')}
                                            </Title>
                                        </Col>
                                        <Col xs={4} className={'mb-16'}>
                                            <Label>Вилоят</Label>
                                            <Title md>
                                                {get(user,'regionId.name','-')}
                                            </Title>
                                        </Col>
                                        <Col xs={4} className={'mb-16'}>
                                            <Label>Туман</Label>
                                            <Title md>
                                                {get(user,'districtsId.name','-')}
                                            </Title>
                                        </Col>
                                        <Col xs={4} className={'mb-16'}>
                                            <Label>Маҳалла</Label>
                                            <Title md>
                                                {get(user,'mfyId.name','-')}
                                            </Title>
                                        </Col>
                                    </Row>
                                </Box>
                            </TabPanel>
                            <TabPanel>
                               <Box>
                                   <h2>No order</h2>
                               </Box>
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
