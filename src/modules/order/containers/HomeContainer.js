import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import {capitalize, get, isEqual, round} from "lodash";
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
import CustomAreaChart from "../../../components/chart/AreaChart";
import Statistics from "../../../components/statistics";
import ApiActions from "../../../services/api/Actions";
import RegionScheme from "../../../schema/RegionScheme";
import Normalizer from "../../../services/normalizer";
import DistrictScheme from "../../../schema/DistrictScheme";
import Actions from "../Actions";
import config from "../../../config";
import moment from "moment";
import NeighborhoodScheme from "../../../schema/NeighborhoodScheme";
import PieChartList from "../components/pie-chart-list/pie-chart-list";
import {PDFDownloadLink} from '@react-pdf/renderer';
import PdfReport from "../../../components/pdf";

const HomeContainer = ({
                           history,
                           user,
                           getRegionList,
                           getDistrictsList,
                           entities,
                           regions,
                           districts,
                           setDistrictListTrigger,
                           getStatisticsPlaceActionCounts,
                           statistics_place_action_counts,
                           statisticsOrderCounts,
                           statistics_order_counts,
                           getStatisticsTypeViolence,
                           statistics_type_violence,
                           getStatisticsVictimCount,
                           getRepublicMonthlyStatistics,
                           statistics_victim_count,
                           republicMonthlyStatistics,
                           getMonthlyStatistics,
                           get_monthly_statistics,
                           getDistrictsByRegion,
                           districtsByRegion,
                           getNeighborhoodsListByDistrict,
                           neighborhoods,
                           getStatisticsOrderCounts,
                           orderStatisticsForMap,
                           ...props
                       }) => {
    const [coordinate, setCoordinate] = useState({x: 0, y: 0});
    const [orderFilter, setOrderFilter] = useState({from: '', to: '', regId: '', distId: '', mfyId: ''});
    const [mfyFilter, setMfyFilter] = useState({from: '', to: '', regId: '', distId: '', mfyId: ''});
    const [filterMonthlyStatistic, setFilterMonthlyStatistics] = useState({from: '', to: ''});
    const [title, setTitle] = useState('');
    useEffect(() => {
        if (isEqual(get(user, 'accountrole.name'), config.ROLES.REGION_ADMIN)) {
            history.push(`/region/${get(user, 'regionId._id')}`);
        }
        if (isEqual(get(user, 'accountrole.name'), config.ROLES.USER)) {
            history.push(`/order/list`);
        }
        setDistrictListTrigger();
        getRegionList({});
        statisticsOrderCounts({});
    }, []);

    useEffect(() => {
        getStatisticsOrderCounts({...orderFilter});

        setTitle(`Республика ${get(regions.find(({_id}) => isEqual(_id, get(orderFilter, 'regId'))), 'name', '')} ${get(districts.find(({_id}) => isEqual(_id, get(orderFilter, 'distId'))), 'name', '')} `)

    }, [orderFilter]);


    useEffect(() => {
        getStatisticsVictimCount({...mfyFilter});
        getStatisticsTypeViolence({...mfyFilter});
        getStatisticsPlaceActionCounts({...mfyFilter});
        getMonthlyStatistics({...mfyFilter});
    }, [mfyFilter]);

    useEffect(() => {
        if (get(mfyFilter, 'regId')) {
            getDistrictsByRegion({regId: get(mfyFilter, 'regId')});
        }
    }, [get(mfyFilter, 'regId')]);


    useEffect(() => {
        if (get(mfyFilter, 'distId')) {
            getNeighborhoodsListByDistrict({districtId: get(mfyFilter, 'distId')});
        }
    }, [get(mfyFilter, 'distId')]);


    useEffect(() => {
        if (get(orderFilter, 'regId')) {
            getDistrictsList({regId: get(orderFilter, 'regId')});
            setOrderFilter(orderFilter => ({...orderFilter, regId: get(orderFilter, 'regId')}));
        }
    }, [get(orderFilter, 'regId')]);

    useEffect(() => {
        if (filterMonthlyStatistic) {
            getRepublicMonthlyStatistics({...filterMonthlyStatistic});
        }
    }, [filterMonthlyStatistic]);

    regions = Normalizer.Denormalize(regions, [RegionScheme], entities);
    districts = Normalizer.Denormalize(districts, [DistrictScheme], entities);
    districtsByRegion = Normalizer.Denormalize(districtsByRegion, [DistrictScheme], entities);
    neighborhoods = Normalizer.Denormalize(neighborhoods, [NeighborhoodScheme], entities).map(({_id, name}) => ({
        value: _id,
        label: name
    }));



    return (
        <>
            <Row className={'mb-16'}>
                <Col xs={10}>
                    <SubHeaderBox items={get(statistics_order_counts, 'data', {})}/>
                    <Row className={'mt-16 mb-16'}>
                        <Col xs={12}>
                            <Title>Худудлар бўйича статистика</Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={7}>
                            <Map setCoordinate={setCoordinate} coordinate={coordinate}
                                 info={get(orderStatisticsForMap, 'result', {})} items={regions}
                                 active={get(orderFilter, 'regId')}
                                 setFilter={(value) => setOrderFilter(orderFilter => ({
                                     ...orderFilter,
                                     regId: value
                                 }))}/>
                        </Col>
                        <Col xs={5}>
                            <Row>
                                <Col xs={12} className={'mb-16'}>
                                    <Slider items={regions} active={get(orderFilter, 'regId')}
                                            setActive={(value) => setOrderFilter(orderFilter => ({
                                                ...orderFilter,
                                                regId: value
                                            }))}/>
                                </Col>
                                <Col xs={12} className={'text-right mb-16'}>
                                    <Flex justify={'flex-end'}>
                                        {get(orderStatisticsForMap, 'isFetched') && <PDFDownloadLink
                                            document={<PdfReport from={get(orderFilter, 'from')}
                                                                 to={get(orderFilter, 'to')}
                                                                 title={`${get(orderStatisticsForMap, 'result.message')} (${title})`}
                                                                 items={get(orderStatisticsForMap, 'result.persrnage').map(({
                                                                                                                                name,
                                                                                                                                per: percent
                                                                                                                            }, index) => ({
                                                                     name,
                                                                     count: get(orderStatisticsForMap, `result.orederscount[${index}].statuscount`),
                                                                     percent: round(percent, 2)
                                                                 }))}/>} fileName={`${get(orderStatisticsForMap, 'result.message')}.pdf`}>
                                            {({blob, url, loading, error}) => <Text className={'cursor-pointer'}>Хисоботни
                                                экспорт
                                                қилиш <img src={exportImg} className={'ml-16'}
                                                           alt=""/></Text>}
                                        </PDFDownloadLink>}
                                        <RangeCalendar handleCalendar={({
                                                                            startDate,
                                                                            endDate
                                                                        }) => setOrderFilter(orderFilter => ({
                                            ...orderFilter,
                                            from: moment(startDate).format("YYYY-MM-DD"),
                                            to: moment(endDate).format("YYYY-MM-DD")
                                        }))}/></Flex>
                                </Col>
                                <Col xs={12}>
                                    <Flex justify={'flex-end'}>
                                        <List active={get(orderFilter,'distId')}
                                              setOrderFilter={(value) => setOrderFilter(orderFilter => ({
                                                  ...orderFilter,
                                                  distId: value
                                              }))}
                                              items={districts}/>
                                    </Flex>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col xs={2}>
                    <ProgressBox items={get(statistics_order_counts, 'data')}/>
                </Col>
            </Row>
            <Row className={'mb-24'}>
                <Col xs={12}>
                    <Box>
                        <Row align={'center'} className={'mb-32'}>
                            <Col xs={3}>
                                <Title primary>Маҳаллалар бўйича статистика</Title>
                            </Col>
                            <Col xs={9}>
                                <Row align={'center'}>
                                    <Col xs={3}>
                                        <Select placeholder={'Вилоятни танланг'}
                                                options={regions.map(({_id, name}) => ({value: _id, label: name}))}
                                                handleChange={({value}) => setMfyFilter(mfyFilter => ({
                                                    ...mfyFilter,
                                                    regId: value
                                                }))}/>
                                    </Col>
                                    <Col xs={3}>
                                        <Select placeholder={'Туманни танланг'}
                                                options={districtsByRegion.map(({_id, name}) => ({
                                                    value: _id,
                                                    label: name
                                                }))}
                                                handleChange={({value}) => setMfyFilter(mfyFilter => ({
                                                    ...mfyFilter,
                                                    distId: value
                                                }))}/>
                                    </Col>
                                    <Col xs={3}>
                                        <Select placeholder={'Маҳаллани танланг'}
                                                options={neighborhoods}
                                                handleChange={({value}) => setMfyFilter(mfyFilter => ({
                                                    ...mfyFilter,
                                                    mfyId: value
                                                }))}/>
                                    </Col>
                                    <Col xs={3}>
                                        <RangeCalendar lg handleCalendar={({
                                                                               startDate,
                                                                               endDate
                                                                           }) => setMfyFilter(mfyFilter => ({
                                            ...mfyFilter,
                                            from: moment(startDate).format("YYYY-MM-DD"),
                                            to: moment(endDate).format("YYYY-MM-DD")
                                        }))}/>
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
                                                get(statistics_place_action_counts, 'result.statistics', []).map((item, index) =>
                                                    <Card key={index} className={'mb-8'}
                                                          title={capitalize(get(item, 'name', '-'))}
                                                          percent={round(get(statistics_place_action_counts, `result.persentages[${index}].persentages`, '-'), 2)}
                                                          count={get(item, 'count', '-')} success/>)
                                            }
                                        </Flex>
                                    </Col>
                                </Row>

                            </Col>
                            <Col xs={5}>
                                <Row>
                                    {get(statistics_type_violence, 'result.statistics', []).map((item, index) => <Col
                                        key={index} xs={4} className={'mb-16'}>
                                        <Type title={get(item, 'name', '-')}
                                              percent={get(statistics_type_violence, `result.persentages[${index}].percent`, 0)}
                                              count={get(item, 'count', '-')} increase/>
                                    </Col>)}

                                </Row>
                            </Col>
                        </Row>
                        <Row className={'mb-32'}>
                            <Col xs={7}>
                                <CustomAreaChart type={'monotone'}
                                                 data={get(get_monthly_statistics, 'result.statistics', []).map(({
                                                                                                                     month,
                                                                                                                     total
                                                                                                                 }) => ({
                                                     name: month,
                                                     y: total
                                                 }))} height={250}/>
                            </Col>
                            <Col xs={5}>
                                <Statistics data={get(statistics_victim_count, 'result', {})}/>
                            </Col>
                        </Row>
                    </Box>
                </Col>
            </Row>
            <Row className={'mb-24'} >
                <Col xs={8}>
                    <Title>Тазйиқ ва зўравонликдан жабрланган хотин-қизларни статистикаси</Title>
                </Col>
                <Col xs={4}>
                    <Flex className={'mb-32'} justify={'flex-end'}>
                        <Flex className={'ml-48'}>
                            <Text className={'mr-8'}>Саралаш</Text><RangeCalendar lg handleCalendar={({
                                                                                                          startDate,
                                                                                                          endDate
                                                                                                      }) => setFilterMonthlyStatistics({
                            from: moment(startDate).format("YYYY-MM-DD"),
                            to: moment(endDate).format("YYYY-MM-DD")
                        })}/>
                        </Flex>
                    </Flex>
                </Col>
                <Col xs={12} className={'mb-48'}>
                    {get(republicMonthlyStatistics,'isFetched') && <CustomAreaChart data={get(republicMonthlyStatistics,'result.statistics').map(({month,total}) => ({name:month,y:total}))} type={'monotone'}/>}
                </Col>

            </Row>
            <Row className={'mb-24'}>
                <Col xs={12}>
                    <PieChartList startDate={get(filterMonthlyStatistic, 'from')}
                                  endDate={get(filterMonthlyStatistic, 'to')}/>
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
        districtsByRegion: get(state, 'normalizer.data.district-list-by-region.result.districts', []),
        statistics_place_action_counts: get(state, 'normalizer.data.get-statistics-place-action-counts', {}),
        statistics_order_counts: get(state, 'order.statistics_order_counts', {}),
        statistics_type_violence: get(state, 'normalizer.data.get-statistics-type-violence', {}),
        statistics_victim_count: get(state, 'normalizer.data.get-statistics-victim-count', {}),
        user: get(state, 'auth.user', {}),
        republicMonthlyStatistics: get(state, 'normalizer.data.republic-monthly-statistics', {}),
        get_monthly_statistics: get(state, 'normalizer.data.get-monthly-statistics', {}),
        neighborhoods: get(state, 'normalizer.data.neighborhoods-list.result.mfy', []),
        orderStatisticsForMap: get(state, 'normalizer.data.get-statistics-order-counts', {}),
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
        getDistrictsByRegion: ({regId, page = 1}) => {
            const storeName = 'district-list-by-region';
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
        getNeighborhoodsListByDistrict: ({districtId, page = 0}) => {
            const storeName = 'neighborhoods-list';
            const entityName = 'neighborhood';
            const scheme = {mfy: [NeighborhoodScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/mfy/distId/${districtId}`,
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
        setDistrictListTrigger: () => dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'district-list',
            },
        }),

        statisticsOrderCounts: (params) => dispatch({
            type: Actions.STATISTICS_ORDER_COUNTS.REQUEST,
            payload: {params},
        }),
        getStatisticsOrderCounts: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/orders/statistics/ordercounts`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'get-statistics-order-counts',
            },
        }),
        getMonthlyStatistics: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/monthly`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'get-monthly-statistics',
            },
        }),
        getStatisticsPlaceActionCounts: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/vicplaceection`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'get-statistics-place-action-counts',
            },
        }),

        getStatisticsTypeViolence: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/victypeviolences`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'get-statistics-type-violence',
            },
        }),
        getStatisticsVictimCount: ({from = '', to = '', regId = '', distId = '', mfyId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/victimcount`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                        'regId': `${regId}`,
                        'distId': `${distId}`,
                        'mfyId': `${mfyId}`,
                    },
                },
                storeName: 'get-statistics-victim-count',
            },
        }),
        getRepublicMonthlyStatistics: ({from = '', to = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/statistics/monthly`,
                config: {
                    params: {},
                    headers: {
                        'from': `${from}`,
                        'to': `${to}`,
                    },
                },
                storeName: 'republic-monthly-statistics',
            },
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeContainer));
