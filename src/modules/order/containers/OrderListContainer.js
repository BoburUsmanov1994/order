import React from 'react';
import {Col, Row} from "react-grid-system";
import {withRouter} from "react-router-dom";
import Title from "../../../components/title";
import Box from "../../../components/box";
import Button from "../../../components/button";
import Flex from "../../../components/flex/Flex";
import OrderSearch from "../components/OrderSearch";
import Select from "../../../components/elements/select/Select";
import Table from "../../../components/table";

const OrderListContainer = ({history}) => {
    return (
        <>
            <Row className={'mb-24'}>
                <Col xs={12}>
                    <hr/>
                </Col>
            </Row>
            <Row className={'mb-24'} align={'center'}>
                <Col xs={6}>
                    <Title>Ордерларни рўйхатга олиш </Title>
                </Col>
                <Col xs={6} className={'text-right'}>
                    <Button success lg thin handleClick={() => history.push('/order/create')}>Янги яратиш</Button> <Button className={'ml-16'} outlined lg
                                                                         thin>Экспорт</Button>
                </Col>
            </Row>
            <Row className={'mb-16'}>
                <Col xs={12}>
                    <Box oval>
                        <Row>
                            <Col xs={12}>
                                <Flex justify={'space-between'}>
                                    <Flex>
                                        <OrderSearch className={'mr-16'}/>
                                        <Select className={'mr-16'}/>
                                        <Select className={'mr-16'}/>
                                        <Select className={'mr-16'}/>
                                    </Flex>
                                    <Button success>Қидириш</Button>
                                </Flex>
                            </Col>
                        </Row>
                    </Box>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Table/>
                </Col>
            </Row>
        </>
    );
};

export default withRouter(OrderListContainer);
