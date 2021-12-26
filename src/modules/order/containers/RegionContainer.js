import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import {get,round,isEqual} from "lodash";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {PDFDownloadLink} from '@react-pdf/renderer';
import SubHeaderBox from "../../../components/subheader";
import ProgressBox from "../../../components/progressbar";
import Title from "../../../components/title";
import Flex from "../../../components/flex/Flex";
import Text from "../../../components/text";
import RangeCalendar from "../../../components/range-calendar";
import CustomAreaChart from "../../../components/chart/AreaChart";
import RegionScheme from "../../../schema/RegionScheme";
import ApiActions from "../../../services/api/Actions";
import DistrictScheme from "../../../schema/DistrictScheme";
import Normalizer from "../../../services/normalizer";
import Slider from "../../../components/slider";
import exportImg from "../../../assets/images/icons/export.png";
import Map from "../../../components/map";
import ContentLoader from "../../../components/loader/ContentLoader";
import moment from "moment";
import NeighborhoodScheme from "../../../schema/NeighborhoodScheme";
import List from "../../../components/list";
import PdfReport from "../../../components/pdf";
import PieChartList from "../components/pie-chart-list/pie-chart-list";


const RegionContainer = ({
                             history,
                             id,
                             entities,
                             getDistrictsList,
                             districts,
                             region,
                             isFetched,
                             getOneRegion,
                             getRegionStatisticsOrderCounts,
                             regionStatistics,
                             getMonthlyStatistics,
                             get_region_monthly_statistics,
                             getNeighborhoodsListByDistrict,
                             neighborhoods,
                             orderStatisticsForMap,
                             getStatisticsOrderCounts,
                             ...rest
                         }) => {
    const [title, setTitle] = useState(null);
    const [filter, setFilter] = useState({from: '', to: '', regId: '', distId: '', mfyId: ''});
    const [coordinate, setCoordinate] = useState({x: 0, y: 0});

    useEffect(() => {
        getOneRegion({region_id: id});
        getDistrictsList({regId: id});
        getRegionStatisticsOrderCounts({regId: id})

    }, [id]);


    useEffect(() => {
        getMonthlyStatistics({...filter, regId: id});
        if (get(filter, 'distId')) {
            getNeighborhoodsListByDistrict({districtId: get(filter, 'distId')});
        }
        getStatisticsOrderCounts({...filter});
        if(get(region,'name')){
            setTitle(`${get(region, 'name')} ${get(districts.find(({_id}) => isEqual(_id,get(filter,'distId'))),'name','')} ${get(neighborhoods.find(({_id}) => isEqual(_id,get(filter,'mfyId'))),'name','')}`)
        }
    }, [id, filter])



    districts = Normalizer.Denormalize(districts, [DistrictScheme], entities);
    region = Normalizer.Denormalize(region, RegionScheme, entities);
    neighborhoods = Normalizer.Denormalize(neighborhoods, [NeighborhoodScheme], entities);


    return (
        <>{isFetched ? <>
            <Row className={'mb-16'}>
                <Col xs={10}>
                    <SubHeaderBox items={get(regionStatistics, 'result', {})} className={'mb-32'}/>
                    <Row className={'mb-16'} align={'center'} gutterWidth={60}>
                        <Col xs={4}>
                            <Title md>{(get(region, 'name'))} худудлари бўйича статистика </Title>
                        </Col>
                        <Col xs={6}>
                            <Slider active={get(filter, 'distId')}
                                    setActive={(value) => setFilter(filter => ({...filter, distId: value}))}
                                    items={districts}/>
                        </Col>
                        <Col xs={2} className={'text-right'}>
                            <Flex justify={'flex-end'}>
                                {get(orderStatisticsForMap,'isFetched') && <PDFDownloadLink document={<PdfReport from={get(filter,'from')} to={get(filter,'to')} title={`${get(orderStatisticsForMap,'result.message')} (${title})`} items={get(orderStatisticsForMap,'result.persrnage').map(({name,per:percent},index) => ({name,count:get(orderStatisticsForMap,`result.orederscount[${index}].statuscount`),percent:round(percent,2)}))} />}  fileName={`${get(orderStatisticsForMap, 'result.message')}.pdf`}>
                                    {({blob, url, loading, error}) =><Text className={'cursor-pointer'}>Хисоботни экспорт
                                    қилиш <img src={exportImg} className={'ml-16'}
                                               alt=""/></Text>}
                                </PDFDownloadLink>}
                            </Flex>
                        </Col>
                    </Row>
                    <Row className={'mb-24'}>
                        <Col xs={12}>
                            <Flex justify={'flex-end'}>
                                <RangeCalendar lg handleCalendar={({
                                                                       startDate,
                                                                       endDate
                                                                   }) => setFilter(filter => ({
                                    ...filter,
                                    from: moment(startDate).format("YYYY-MM-DD"),
                                    to: moment(endDate).format("YYYY-MM-DD")
                                }))}/>
                            </Flex>
                        </Col>
                    </Row>
                    <Row className={'mb-32'}>
                        <Col xs={6}>
                            <Row>
                                <Col xs={12}>
                                    <Map  transfer viewBox={get(region, 'viewBox', '')}
                                         transform={get(region, 'transform', '')} items={districts}
                                         setCoordinate={setCoordinate} coordinate={coordinate}
                                         info={get(orderStatisticsForMap, 'result', {})}
                                         active={get(filter, 'distId')}
                                         setFilter={(value) => setFilter(filter => ({
                                             ...filter,
                                             distId: value
                                         }))}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={6}>
                            <Flex justify={'flex-end'}>
                                <List active={get(filter,'mfyId')}
                                      setOrderFilter={(value) => setFilter(filter => ({
                                          ...filter,
                                          mfyId: value
                                      }))}
                                      items={neighborhoods}/>
                            </Flex>
                        </Col>
                    </Row>

                </Col>
                <Col xs={2}>
                    <ProgressBox items={get(regionStatistics,'result',{})}/>
                </Col>
            </Row>

            <Row align={'center'} className={'mb-32'}>
                <Col xs={12}>
                    <Title md>Тазйиқ ва зўравонликдан жабрланган хотин-қизларни статистикаси</Title>
                </Col>
            </Row>
            <Row className={'mb-32'}>
                <Col xs={12}>
                    <CustomAreaChart type={'monotone'}
                                     data={get(get_region_monthly_statistics, 'result.statistics', []).map(({
                                                                                                         month,
                                                                                                         total
                                                                                                     }) => ({
                                         name: month,
                                         y: total
                                     }))} height={250}/>
                </Col>
            </Row>
            <Row className={'mb-24'}>
                <Col xs={12}>
                    <PieChartList title={get(region,'name')}  startDate={get(filter, 'from')}
                                  endDate={get(filter, 'to')} regId={get(filter,'regId')}/>
                </Col>
            </Row>


            </>:<ContentLoader />}
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        region: get(state, 'normalizer.data.get-one-region.result.region', {}),
        districts: get(state, 'normalizer.data.district-list.result.districts', []),
        isFetched: get(state, 'normalizer.data.get-one-region.isFetched', false),
        regionStatistics: get(state, 'normalizer.data.get-region-statistics-order-counts', {}),
        get_region_monthly_statistics: get(state, 'normalizer.data.get-region-monthly-statistics', {}),
        neighborhoods: get(state, 'normalizer.data.neighborhoods-list.result.mfy', []),
        orderStatisticsForMap: get(state, 'normalizer.data.get-statistics-order-counts', {}),

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDistrictsList: ({regId, page = 1}) => {
            const storeName = 'district-list';
            const entityName = 'region';
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
        getOneRegion: ({region_id}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/regions/${region_id}`,
                config: {
                    params: {},
                },
                scheme: {region: RegionScheme},
                storeName: 'get-one-region',
                entityName: 'region',
            },
        }),
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
        getRegionStatisticsOrderCounts: ({from = '', to = '', regId = ''}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/orders/statistics/ordercounts`,
                config: {
                    params: {},
                    headers: {
                        'from': `2021-01-01`,
                        'to': `2021-12-31`,
                        'regId': `${regId}`,
                    },
                },
                storeName: 'get-region-statistics-order-counts',
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
                storeName: 'get-region-monthly-statistics',
            },
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegionContainer));
