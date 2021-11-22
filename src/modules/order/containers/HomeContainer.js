import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import {capitalize, find, get, isEqual,round} from "lodash";
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
import {statistics} from "../../../mock";
import Actions from "../Actions";
import config from "../../../config";

const HomeContainer = ({
                           history,
                           user,
                           getRegionList,
                           getDistrictsList,
                           entities,
                           regions,
                           districts,
                           setDistrictListTrigger,
                           statisticsPlaceActionCounts,
                           statistics_place_action_counts,
                           statisticsOrderCounts,
                           statistics_order_counts,
                           statisticsTypeViolence,
                           statistics_type_violence,
                           statisticsVictimCount,
                           getMonthlyStatistics
                       }) => {
    const [active, setActive] = useState(null);
    const [popup, setPopup] = useState(null);
    const [orderFilter,setOrderFilter] = useState({from:  null,to:null,regId:null,distId:null,mfyId:null});
    useEffect(() => {
        if(isEqual(get(user,'accountrole.name'),config.ROLES.REGION_ADMIN)){
            history.push(`/region/${get(user,'regionId._id')}`);
        }
        if(isEqual(get(user,'accountrole.name'),config.ROLES.USER)){
            history.push(`/order/list`);
        }

        setDistrictListTrigger();
        getRegionList({});
        statisticsPlaceActionCounts();
        statisticsTypeViolence();
        statisticsVictimCount();
        getMonthlyStatistics();
    }, []);

    useEffect(() => {
        statisticsOrderCounts({...orderFilter});
    },[orderFilter])
    useEffect(() => {
        if (active) {
            getDistrictsList({regId: active});
            setPopup(find(statistics,item => isEqual(get(item,'id'),active)))
        }
    }, [active])
    regions = Normalizer.Denormalize(regions, [RegionScheme], entities);
    districts = Normalizer.Denormalize(districts, [DistrictScheme], entities);

    return (
        <>
            <Row className={'mb-16'}>
                <Col xs={10}>
                    <SubHeaderBox items={statistics_order_counts}/>
                    <Row className={'mt-16 mb-16'}>
                        <Col xs={12}>
                            <Title>Худудлар бўйича статистика</Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={7}>
                            <Map popup={popup}  items={regions} active={active} setActive={setActive}/>
                        </Col>
                        <Col xs={5}>
                            <Row>
                                <Col xs={12} className={'mb-16'}>
                                    <Slider items={regions} active={active} setActive={setActive}/>
                                </Col>
                                <Col xs={12} className={'text-right mb-16'}>
                                    <Flex justify={'flex-end'}> <Text className={'cursor-pointer'}>Хисоботни экспорт
                                        қилиш <img src={exportImg} className={'ml-16 mr-16'}
                                                   alt=""/></Text><RangeCalendar  /></Flex>
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
                    <ProgressBox items={statistics_order_counts}/>
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
                                        <Flex wrap>
                                            {
                                                get(statistics_place_action_counts, 'placeectioncounts', []).map((item, index) =>
                                                    <Card key={index} className={'mb-8'}
                                                          title={capitalize(get(item, 'placename', '-'))}
                                                          percent={round(get(statistics_place_action_counts, `persrnage[${index}].plpers`, '-'),2)}
                                                          count={get(item, 'placcount', '-')} success/>)
                                            }
                                        </Flex>
                                    </Col>
                                </Row>

                            </Col>
                            <Col xs={5}>
                                <Row>
                                    {get(statistics_type_violence,'typeviolence',[]).map((item,index) => <Col key={index} xs={4} className={'mb-16'}>
                                        <Type title={get(item,'typeviolence','-')} count={get(item,'typeviolencecount','-')} increase/>
                                    </Col>)}

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
            <Row className={'mb-24'} >
                <Col xs={12}>
                    <Title>Тазйиқ ва зўравонликдан жабрланган хотин-қизларни статистикаси</Title>
                </Col>
                <Col xs={12}>
                    <Flex className={'mb-32'} justify={'flex-end'}>
                        <Radio className={'mr-16'} label={'Умумий ордерлар сони'} danger/>
                        <Radio className={'mr-16'} label={'Жабрланувчилар'} warning/>
                        <Radio className={'mr-16'} label={'Айбдорлар'} primary/>
                        <Flex className={'ml-48'}>
                            <Text className={'mr-8'}>Саралаш</Text><RangeCalendar/>
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
        statistics_place_action_counts: get(state, 'order.statistics_place_action_counts.data', {}),
        statistics_order_counts:get(state, 'order.statistics_order_counts.data', {}),
        statistics_type_violence:get(state, 'order.statistics_type_violence.data', {}),
        user:get(state,'auth.user',{})
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
        }),
        statisticsPlaceActionCounts: () => dispatch({
            type: Actions.STATISTICS_PLACE_ACTION_COUNTS.REQUEST,
            payload: {},
        }),
        statisticsOrderCounts: (params) => dispatch({
            type: Actions.STATISTICS_ORDER_COUNTS.REQUEST,
            payload: {params},
        }),
        statisticsTypeViolence: () => dispatch({
            type: Actions.STATISTICS_TYPE_VIOLENCE.REQUEST,
            payload: {},
        }),
        statisticsVictimCount: () => dispatch({
            type: Actions.STATISTICS_VICTIM_COUNT.REQUEST,
            payload: {},
        }),
        getMonthlyStatistics: () => dispatch({
            type: Actions.GET_MONTHLY_STATISTICS.REQUEST,
            payload: {},
        })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeContainer));
