import React, {useEffect} from 'react';
import {Col, Row} from "react-grid-system";
import {connect} from "react-redux";
import {get} from "lodash";
import {withRouter} from "react-router-dom";
import ApiActions from "../../../services/api/Actions";
import ContentLoader from "../../../components/loader/ContentLoader";
import Normalizer from "../../../services/normalizer";
import Flex from "../../../components/flex/Flex";
import OrderScheme from "../../../schema/OrderScheme";
import shieldImg from "../../../assets/images/shield.png";
import Title from "../../../components/title";
import Text from "../../../components/text";
import Box from "../../../components/box";

const OrderViewContainer = ({history, id, getOneOrder, entities, order, isFetched}) => {
    useEffect(() => {
        getOneOrder({id});
    }, [id]);
    order = Normalizer.Denormalize(order, OrderScheme, entities);

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
                                <Title className={'mb-8'} md>{get(order, 'protectionorderseries')}</Title>
                                <Text>Ҳимоя ордери ҳақида умумий маълумотлар </Text>
                            </Flex>
                        </Flex>
                    </Col>
                    <Col xs={12} className={'mt-24'}>
                        <hr/>
                    </Col>
                </Row>
                <Row className={'mt-24'}>
                    <Col xs={12}>
                        <Box>
                            <Row>
                                <Col xs={4}>
                                    <Flex>

                                    </Flex>
                                </Col>
                                <Col xs={8}></Col>
                            </Row>
                        </Box>
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
        order: get(state, 'normalizer.data.get-one-order.result.result', {}),
        isFetched: get(state, 'normalizer.data.get-one-order.isFetched', false),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getOneOrder: ({id}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/orders/${id}`,
                config: {
                    params: {},
                },
                scheme: {result: OrderScheme},
                storeName: 'get-one-order',
                entityName: 'order',
            },
        }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderViewContainer));
