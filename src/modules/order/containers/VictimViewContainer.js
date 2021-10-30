import React, {useEffect} from 'react';
import {Col, Row} from "react-grid-system";
import {connect} from "react-redux";
import {get,isEmpty} from "lodash";
import {withRouter} from "react-router-dom";
import ApiActions from "../../../services/api/Actions";
import ContentLoader from "../../../components/loader/ContentLoader";
import Normalizer from "../../../services/normalizer";
import Flex from "../../../components/flex/Flex";
import shieldImg from "../../../assets/images/shield.png";
import Title from "../../../components/title";
import Text from "../../../components/text";
import Box from "../../../components/box";
import victimIcon from "../../../assets/images/icons/victim.png";
import Button from "../../../components/button";
import VictimScheme from "../../../schema/VictimScheme";
import OrderItemDetail from "../../../components/order-item/order-item-detail";

const VictimViewContainer = ({history, id, getOneVictim, entities, victim, isFetched}) => {
    useEffect(() => {
        getOneVictim({id});
    }, [id]);
    victim = Normalizer.Denormalize(victim, VictimScheme, entities);
    return (
        <>{isFetched ?
            <><Row className={'mb-32'}>
                <Col xs={12}>
                    <hr/>
                </Col>
            </Row>
                <Row>
                    <Col xs={12}>
                        <Flex>
                            <img src={shieldImg} className={'mr-16'} alt=""/>
                            <Flex column align={'flex-start'}>
                                <Title className={'mb-8'} lg>ID:{get(victim, 'citizensId.identitynumber','-')}</Title>
                                <Text medium md>Жабрланувчи тўғрисида маълумот</Text>
                            </Flex>
                        </Flex>
                    </Col>
                    <Col xs={12} className={'mt-24'}>
                        <hr/>
                    </Col>
                </Row>
                <Row className={'mt-24'}>
                    <Col xs={12}>
                        <Box className={'mb-24'}>
                            <Row>
                                <Col xs={12}>
                                    <Row className={'mb-48'}>
                                        <Col xs={12}>
                                            <Flex className={'mb-24'}>
                                                <img src={victimIcon} className={'mr-16 mt-16'} alt=""/>
                                                <Title md>Тазйиқ ва зўравонликдан жабрланган шахс тўғрисида маълумот</Title>
                                            </Flex>
                                        </Col>
                                        <Col xs={12}>
                                            <OrderItemDetail item={victim}/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Box>
                    </Col>
                </Row>
                <Row className={'mb-48'}>
                    <Col xs={12}>
                        <Flex>
                            <Button handleClick={() => history.push('/victim/list')} outlined className={'mr-16'}>Ортга</Button>  <Button handleClick={() => window.print()} success>Чоп этиш</Button>
                        </Flex>
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
        victim: get(state, 'normalizer.data.get-one-victim.result.result', {}),
        isFetched: get(state, 'normalizer.data.get-one-victim.isFetched', false),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getOneVictim: ({id}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/victim/${id}`,
                config: {
                    params: {},
                },
                scheme: {result: VictimScheme},
                storeName: 'get-one-victim',
                entityName: 'victim',
            },
        }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VictimViewContainer));
