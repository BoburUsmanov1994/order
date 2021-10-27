import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import {get} from "lodash";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import SubHeaderBox from "../../../components/subheader";
import ProgressBox from "../../../components/progressbar";
import Map from "../../../components/map";
import Title from "../../../components/title";
import Slider from "../../../components/slider";
import Text from "../../../components/text";
import exportImg from "../../../assets/images/icons/export.png";
import Flex from "../../../components/flex/Flex";
import RangeCalendar from "../../../components/range-calendar";
import List from "../../../components/list";
import Box from "../../../components/box";
import Select from "./../../../components/elements/select";
import Card from "../../../components/card";
import Type from "../../../components/type";
import Radio from "../../../components/elements/radio";
import CustomAreaChart from "../../../components/chart/AreaChart";
import Statistics from "../../../components/statistics";
import ApiActions from "../../../services/api/Actions";
import RegionScheme from "../../../schema/RegionScheme";
import Normalizer from "../../../services/normalizer";
import DistrictScheme from "../../../schema/DistrictScheme";

const HomeContainer = ({history, getRegionList, getDistrictsList, entities, regions, districts,setDistrictListTrigger}) => {
    const [active, setActive] = useState(null);
    useEffect(() => {
        setDistrictListTrigger();
        getRegionList({});
    }, [])
    useEffect(() => {
        if (active) {
            getDistrictsList({regId: active})
        }
    }, [active])
    regions = Normalizer.Denormalize(regions, [RegionScheme], entities);
    districts = Normalizer.Denormalize(districts, [DistrictScheme], entities);
    return (
        <>
            <Row className={'mb-16'}>
                <Col xs={10}>
                    <SubHeaderBox/>
                    <Row className={'mt-16 mb-16'}>
                        <Col xs={12}>
                            <Title>Худудлар бўйича статистика</Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={7}>
                            <Map  items={regions} active={active} setActive={setActive}/>
                        </Col>
                        <Col xs={5}>
                            <Row>
                                <Col xs={12} className={'mb-16'}>
                                    <Slider items={regions} active={active} setActive={setActive}/>
                                </Col>
                                <Col xs={12} className={'text-right mb-16'}>
                                    <Flex justify={'flex-end'}> <Text className={'cursor-pointer'}>Хисоботни экспорт
                                        қилиш <img src={exportImg} className={'ml-16'}
                                                   alt=""/></Text><RangeCalendar/></Flex>
                                </Col>
                                <Col xs={12}>
                                    <Flex justify={'flex-end'}>
                                        <List items={districts}/>
                                    </Flex>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col xs={2}>
                    <ProgressBox/>
                </Col>
            </Row>
            <Row className={'mb-24'}>
                <Col xs={12}>
                    <Box>
                        <Row align={'center'} className={'mb-32'}>
                            <Col xs={3}>
                                <Title primary>Маҳаллалар бўйича статистика</Title>
                            </Col>
                            <Col xs={3}>
                                <Select/>
                            </Col>
                            <Col xs={6}>
                                <Row>
                                    <Col xs={11}>
                                        <Slider/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className={'mb-32'}>
                            <Col xs={7}>
                                <Row className={'mb-16'}>
                                    <Col xs={12}><Text primary md>Содир этилган жойи </Text></Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <Flex justify={'space-between'}>
                                            <Card title={'Оилада'} percent={15} count={'339,259'} danger/>
                                            <Card title={'Таълим муассасасида'} percent={23} count={'339,259'} success/>
                                            <Card title={'Кўчада'} percent={23} count={'339,259'} primary/>
                                            <Card title={'Жамоат жойида'} percent={23} count={'339,259'} warning/>
                                            <Card title={'Иш жойида'} percent={23} count={'339,259'} primary/>
                                        </Flex>
                                    </Col>
                                </Row>

                            </Col>
                            <Col xs={5}>
                                <Row>
                                    <Col xs={4} className={'mb-16'}>
                                        <Type title={'Жинсий зўравонлик '} increase/>
                                    </Col>
                                    <Col xs={4} className={'mb-16'}>
                                        <Type title={'Жинсий зўравонлик '} decrease/>
                                    </Col>
                                    <Col xs={4} className={'mb-16'}>
                                        <Type title={'Жинсий зўравонлик '}/>
                                    </Col>
                                    <Col xs={4} className={'mb-16'}>
                                        <Type title={'Жинсий зўравонлик '}/>
                                    </Col>
                                    <Col xs={4} className={'mb-16'}>
                                        <Type title={'Жинсий зўравонлик '}/>
                                    </Col>
                                    <Col xs={4} className={'mb-16'}>
                                        <Type title={'Жинсий зўравонлик '}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className={'mb-32'}>
                            <Col xs={7}>
                                <CustomAreaChart height={250} />
                            </Col>
                            <Col xs={5}>
                                <Statistics />
                            </Col>
                        </Row>
                    </Box>
                </Col>
            </Row>
            <Row className={'mb-24'}>
                <Col xs={12}>
                    <Title>Тазйиқ ва зўравонликдан жабрланган хотин-қизларни статистикаси</Title>
                </Col>
                <Col xs={12}>
                    <Flex className={'mb-32'} justify={'flex-end'}>
                        <Radio className={'mr-16'} label={'Умумий ордерлар сони'} danger/>
                        <Radio className={'mr-16'} label={'Жабрланувчилар'} warning/>
                        <Radio className={'mr-16'} label={'Айбдорлар'} primary/>
                        <Flex className={'ml-48'}>
                            <Text>Саралаш</Text><RangeCalendar/>
                        </Flex>
                    </Flex>
                </Col>
                <Col xs={12}>
                    <CustomAreaChart type={'monotone'}/>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        regions: get(state, 'normalizer.data.region-list.result.region', []),
        districts: get(state, 'normalizer.data.district-list.result.districts', []),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRegionList: ({page = 1}) => {
            const storeName = 'region-list';
            const entityName = 'region';
            const scheme = {region: [RegionScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/regions',
                    config: {
                        params: {
                            page
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getDistrictsList: ({regId, page = 1}) => {
            const storeName = 'district-list';
            const entityName = 'district';
            const scheme = {districts: [DistrictScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/districts/reg/${regId}`,
                    config: {
                        params: {},
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        setDistrictListTrigger: () => dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'district-list',
            },
        })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeContainer));
