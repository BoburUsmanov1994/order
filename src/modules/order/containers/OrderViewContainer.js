import React, {useEffect} from 'react';
import {Col, Row} from "react-grid-system";
import {connect} from "react-redux";
import {get,isEmpty} from "lodash";
import {withRouter} from "react-router-dom";
import moment from "moment";
import ApiActions from "../../../services/api/Actions";
import ContentLoader from "../../../components/loader/ContentLoader";
import Normalizer from "../../../services/normalizer";
import Flex from "../../../components/flex/Flex";
import OrderScheme from "../../../schema/OrderScheme";
import shieldImg from "../../../assets/images/shield.png";
import Title from "../../../components/title";
import Text from "../../../components/text";
import Box from "../../../components/box";
import pinIcon from "../../../assets/images/icons/pin.png";
import clockIcon from "../../../assets/images/icons/clock.png";
import barcodeIcon from "../../../assets/images/icons/barcode.png";
import victimIcon from "../../../assets/images/icons/victim.png";
import violentIcon from "../../../assets/images/icons/violent.png";
import OrderItem from "../../../components/order-item";
import Button from "../../../components/button";

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
                                <Title className={'mb-8'} lg>{get(order, 'protectionorderseries')}</Title>
                                <Text medium md>Ҳимоя ордери ҳақида умумий маълумотлар </Text>
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
                                <Col xs={4} className={'hasBorderRight'}>
                                    <Row className={'mb-48'}>
                                        <Col xs={12}>
                                            <Flex className={'mb-24'}>
                                                <img className={'mr-16'} src={pinIcon} alt=""/> <Text md>Ҳимоя
                                                ордерининг берилган жойи</Text>
                                            </Flex>
                                        </Col>
                                        <Col xs={10} offset={{xs: 1}}>
                                            <Flex className={'mb-8'}>
                                                <Text>Вилоят: {get(order,'regiId.name','-')}</Text>
                                            </Flex>
                                            <Flex className={'mb-8'}>
                                                <Text>Туман/шаҳар: {get(order,'districtId.name','-')}</Text>
                                            </Flex>
                                            <Flex className={'mb-8'}>
                                                <Text>Маҳалла: {get(order,'mfy.name','-')}</Text>
                                            </Flex>
                                        </Col>
                                    </Row>
                                    <Row className={'mb-48'}>
                                        <Col xs={12}>
                                            <Flex className={'mb-24'}>
                                                <img className={'mr-16'} src={clockIcon} alt=""/> <Text md> Ордер
                                                берилган вақти</Text>
                                            </Flex>
                                        </Col>
                                        <Col xs={10} offset={{xs: 1}}>
                                            <Flex className={'mb-8'}>
                                                <Text className={'mr-16'}>Ҳимоя ордерининг
                                                    амал қилиш вақти: </Text> <Text>{moment(get(order,'givendate')).format("DD.MM.YYYY")} - {moment(get(order,'endedate')).format("DD.MM.YYYY")}</Text>
                                            </Flex>
                                            <Flex className={'mb-8'}>
                                                <Text className={'mr-16'}>Ҳимоя ордерининг
                                                    ҳолати: </Text> <Text>{get(order,'orderstatus.name','-')}</Text>
                                            </Flex>
                                        </Col>
                                    </Row>
                                    <Row className={'mb-48'}>
                                        <Col xs={12}>
                                            <Flex className={'mb-24'}>
                                                <img className={'mr-16'} src={barcodeIcon} alt=""/> <Text md> Ҳимоя
                                                ордернинг серияси</Text>
                                            </Flex>
                                        </Col>
                                        <Col xs={10} offset={{xs: 1}}>
                                            <Flex>
                                                <Text className={'mr-16'}>№ {get(order,'protectionorderseries','-')}</Text>
                                            </Flex>
                                        </Col>
                                    </Row>
                                    <Row className={'mb-48'}>
                                        <Col xs={12}>
                                            <Flex className={'mb-24'}>
                                                <Text md>Тазйиқ ва зўравонликнинг қисқача фабуласи:</Text>
                                            </Flex>
                                        </Col>
                                        <Col xs={12}>
                                            <Flex>
                                                <Text>{get(order,'basisorder.name','-')}</Text>
                                            </Flex>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Flex className={'mb-24'}>
                                                <Text md medium>Умумий маълумот:</Text>
                                            </Flex>
                                        </Col>
                                        <Col xs={12}>
                                            <Flex className={'mb-8'} justify={'space-between'}>
                                                <Text>Жабрланган хотин-қизлар сони: </Text><Text className={'mr-16'}
                                                                                                 medium>{get(order,'victim',[]).length}</Text>
                                            </Flex>
                                            <Flex className={'mb-8'} justify={'space-between'}>
                                                <Text>Зўравонлик содир этган шахслар сони:</Text><Text
                                                className={'mr-16'} medium>{get(order,'violent',[]).length}</Text>
                                            </Flex>
                                            <Flex className={'mb-8'} justify={'space-between'}>
                                                <Text>Жами:</Text><Text className={'mr-16'} medium>
                                                {get(order,'violent',[]).length + get(order,'victim',[]).length}
                                            </Text>
                                            </Flex>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={8}>
                                    <Row className={'mb-48'}>
                                        <Col xs={12}>
                                            <Flex className={'mb-24'}>
                                                <img src={victimIcon} className={'mr-16 mt-16'} alt=""/>
                                                <Title md>Тазйиқ ва зўравонликдан жабрланган хотин-қизлар
                                                    рўйхати</Title>
                                            </Flex>
                                        </Col>
                                        <Col xs={12}>
                                            { !isEmpty(get(order,'victim',[])) ?
                                                get(order,'victim',[]) && get(order,'victim',[]).map((item,index) => <OrderItem key={index} item={item}/>):<p className={'text-center'}>Мавжуд эмас</p>
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Flex className={'mb-24'}>
                                                <img src={violentIcon} className={'mr-16 mt-16'} alt=""/>
                                                <Title md>Тазйиқ ва зўравонлик содир этган шахслар рўйхати</Title>
                                            </Flex>
                                        </Col>
                                        <Col xs={12}>
                                            { !isEmpty(get(order,'violent',[])) ?
                                                get(order,'violent',[]) && get(order,'violent',[]).map((item,index) => <OrderItem key={index} item={item}/>):<p className={'text-center'}>Мавжуд эмас</p>
                                            }
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
                            <Button handleClick={() => history.push('/order/list')} outlined className={'mr-16'}>Ортга</Button>  <Button handleClick={() => window.print()} success>Чоп этиш</Button>
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
